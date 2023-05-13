import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useController } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'

// styling
const BookingStyles = styled.div`
    .booking {
        padding: 2.5rem 1rem;

        p {
            padding: 0 0 1rem;
        }
    }

    .bookingForm {
        width: 100%;
        display: flex;
        flex-direction: column;

        input, textarea {
            background-color: var(--input-background);
            border: none;
            border-radius: 5px;
            color: var(--text-color);
            font-size: 1.8rem;
            line-height: 3.5rem;
            font-family: var(--header-footer-font);
            letter-spacing: 0.1rem;
            border-bottom: 1px solid var(--text-color);
            margin: 0.5rem 0;
            padding-left: 1rem;
            
            ::placeholder {
                color: var(--header-footer-background);
            }
        }
    }

    .formError {
        color: #B90504;
        font-weight: bold;
        padding-left: 1.5rem;
    }

    .uploadPreview {
        width: 100%;
        max-width: 600px
        display: flex;
        justify-content: center;

        canvas {
            width: 100%;
            display: block;
        }
    }

    button {
        margin-top: 2rem;
        max-width: 10rem;
        background-color: var(--header-footer-background);
        color: var(--header-footer-text-color);
        font-family: var(--header-footer-font);
        padding: 1rem 2rem;
        border-radius: 5px;
    }
`;


const Booking = (props) => {
    let navigate = useNavigate();

    const { handleSubmit, control, setError, clearErrors, reset, formState: { errors } } = useForm({
        mode: 'onSubmit',
        // resolver: yupResolver(bookingSchema),
    });

    const { field: clientname } = useController({
        name: "clientname",
        control,
        rules: { required: true }
    });

    const { field: clientphone } = useController({
        name: "clientphone",
        control,
        rules: {
        required: true,
        pattern: {
            value: /^\d{10}$/,
            message: "Please enter a valid phone number"
        }
        }
    });

    const { field: clientemail } = useController({
        name: "clientemail",
        control,
        rules: {
        required: true,
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Please enter a valid email address"
        }
        }
    });

    const { field: clientdescription } = useController({
        name: "clientdescription",
        control,
        rules: { required: true }
    });

    const { field: referenceImage } = useController({
        name: "referenceImage",
        control,
        rules: {
        required: true,
        validate: {
            maxSize: (files) =>
            files[0].size <= 5 * 1024 * 1024 * 1024 ||
            "File size should be less than 5GB",
            allowedTypes: (files) =>
            /(\.jpg|\.jpeg|\.png|\.webp)$/i.test(files[0].name) ||
            "Only JPG, JPEG, PNG, and WebP files are allowed"
        }
        },
        defaultValue: ""
    });

    const submitAppointment = async (data) => {
        try {
            // set up required fields and error messages
            const requiredFields = ['clientname', 'clientphone', 'clientdescription']
            const errorMessages = {
                clientname: 'name is required',
                clientphone: 'contact number is required',
                clientdescription: 'tattoo description is required',
            }
            
            // check for required fields, all fields requied except email
            requiredFields.forEach((field) => {
                if(!data[field]) {
                    setError(field, { message: errorMessages[field] })
                }
            })

            // check for required image
            if(data.referenceImage.length <= 0) {
                setError('referenceImage', { message: 'reference image is required' })
            }

            // set up s3 for image upload
            const imageToUpload = data.referenceImage[0]
            const s3 = new S3Client({
                region: process.env.REACT_APP_AWS_REGION,
                credentials: {
                    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
                },
            });

            // create image upload detilas
            const fileExtension = imageToUpload.name.split('.').pop();
            const fileName = `${data.clientname}_${uuidv4()}.${fileExtension}`;
            const params = {
                Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
                Key: fileName,
                Body: imageToUpload,
                ContentType: imageToUpload.type,
            };

            // send image to s3 and create the image s3 url
            const command = new PutObjectCommand(params);
            await s3.send(command);
            const url = `${process.env.REACT_APP_AWS_IMAGE_LINK}${fileName}`;

            // remove the file from the data object before sending to lambda
            delete data['referenceImage']
            data['imagelink'] = url

            // send to lambda function, sending an email to booking
            const response = await axios({
                method : 'post',
                url : process.env.REACT_APP_AWS_LAMBDA,
                data : {...data},
            })

            if(response.status === 200) {
                reset()
                toast.success('Thank you for your message!  You should be contacted soon', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000 // 3 seconds
                });
                setTimeout(() => {
                    navigate('/tat2javi')
                }, 3000)

            } else {
                toast.error('Network connection error', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000 // 3 seconds
                })
            }
            
        } catch(error) {
            if(error.name === 'TypeError') {
                toast.error('Error connecting to server for file upload', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000 // 3 seconds
                });
            }
            
            if(error.name === 'InvalidAccessKeyId' || error.name === 'SignatureDoesNotMatch') {
                toast.error('Invalid server credentials', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000 // 3 seconds
                });
            }
            
            if(error.name === 'AxiosError') {
                toast.error('Network connection error', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000 // 3 seconds
                });
            }
        }
    }

    console.log(errors)
    return (
        <BookingStyles>
            <div className='booking'>
                <p>Send your contact and tattoo idea, and we can begin to bring your vision to life</p>
                <form onSubmit={handleSubmit(submitAppointment)} className='bookingForm' encType='multipart/form-data'>
                    
                    <input
                        {...clientname}
                        id='clientname'
                        type='text'
                        placeholder='Name'
                        onClick={() => clearErrors('clientname')}
                        />
                    {errors.clientname ? <div className='formError'>{errors.clientname?.message}</div> : null}
                    <input
                        {...clientphone}
                        id='clientphone'
                        placeholder='Phone'
                        onClick={() => clearErrors('clientphone')}
                        />
                    {errors.clientphone ? <div className='formError'>{errors.clientphone?.message}</div> : null}

                    <input
                        {...clientemail}
                        id='clientemail'
                        type='text'
                        placeholder='Email'
                        onClick={() => clearErrors('clientemail')}
                        />
                    {errors.clientemail ? <div className='formError'>{errors.clientemail?.message}</div> : null}

                    <textarea
                        {...clientdescription}
                        id='clientdescription'
                        type='text'
                        rows='10'
                        placeholder='Describe your tattoo idea and attach a reference image'
                        onClick={() => clearErrors('clientdescription')}
                        />
                    {errors.clientdescription ? <div className='formError'>{errors.clientdescription?.message}</div> : null}

                    <input
                        {...referenceImage}
                        id='referenceImage'
                        type='file'
                        accept='image/*'
                        onClick={() => clearErrors('referenceImage')}
                    />
                    {errors.referenceImage ? <div className='formError'>{errors.referenceImage?.message}</div> : null}

                    <button type='submit'>Submit</button>
                </form>
                <ToastContainer />
            </div>
        </BookingStyles>
    );
}

export default Booking;