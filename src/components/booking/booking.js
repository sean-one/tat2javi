import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'

// styling
const BookingStyles = styled.div`
    .booking {
        padding: 2.5rem 0.25rem;
    }

    .bookingForm {
        width: 100%;
        display: flex;
        flex-direction: column;

        input, textarea {
            background-color: black;
            border: none;
            color: var(--header-footer-background);
            font-size: 18px;
            font-family: var(--header-footer-font);
            letter-spacing: 0.1rem;
            border-bottom: 1px solid #364652;
            /* text-transform: uppercase; */
            margin: 0.5rem 1rem;
            padding: 0.5rem 1rem;
        }
    }

    .formError {
        color: #B90504;
        /* color: #990100; */
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
        color: var(--header-footer-text);
        font-family: var(--header-footer-font);
        padding: 1rem 2rem;
        border-radius: 5px;
    }
`;

const bookingSchema = yup.object().shape({
    clientname: yup
        .string()
        .required("Name is required")
        .max(50, "Name must be less than 50 characters")
        .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, { message: "Name must only contain alphabetical characters", excludeEmptyString: true }),

    clientphone: yup
        .string()
        .required('Phone number is required')
        .matches(
            /^[0-9]{10}$/,
            "Phone number must be a valid 10-digit number (e.g. 123-456-7890)"
        ),

    clientemail: yup
        .string()
        .email("Email must be a valid email address"),
    
    clientdescription: yup
        .string()
        .required('Tattoo description is required')
        .max(250, "Description must be less than 250 characters"),

    referenceImage: yup
        .mixed()
        .required("An image is required")
        .test(
            "fileSize",
            "File size must be less than 2MB",
            (value) => !value || (value && value.size <= 2000000)
        )
        .test(
            "fileType",
            "File must be a valid image type (e.g. jpeg, png, webp)",
            (value) => !value || (value && ["image/jpeg", "image/png", "images/webp"].includes(value.type))
        ),
    
})

const Booking = (props) => {
    let navigate = useNavigate()
    const { register, handleSubmit, setError, clearErrors, reset, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(bookingSchema),
    })

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

            }
            console.log(response.status)

            
        } catch(error) {
            console.log(error)
        }
    }


    return (
        <BookingStyles>
            <div className='booking'>
                <p>Do you have a tattoo idea that you would like</p>
                <form onSubmit={handleSubmit(submitAppointment)} className='bookingForm' encType='multipart/form-data'>
                    
                    <input
                        {...register('clientname')}
                        type='text'
                        onFocus={() => clearErrors('clientname')}
                        placeholder='Name'
                    />
                    {errors.clientname ? <div className='formError'>{errors.clientname?.message}</div> : null}

                    <input
                        {...register('clientphone')}
                        type='number'
                        onFocus={() => clearErrors('clientphone')}
                        placeholder='Phone'
                    />
                    {errors.clientphone ? <div className='formError'>{errors.clientphone?.message}</div> : null}

                    <input
                        {...register('clientemail')}
                        type='text'
                        onFocus={() => clearErrors('clientemail')}
                        placeholder='Email'
                    />
                    {errors.clientemail ? <div className='formError'>{errors.clientemail?.message}</div> : null}

                    <textarea
                        {...register('clientdescription')}
                        type='text'
                        onFocus={() => clearErrors('clientdescription')}
                        rows='10'
                        placeholder='Describe your tattoo idea and attach a reference image'
                    />
                    {errors.clientdescription ? <div className='formError'>{errors.clientdescription?.message}</div> : null}

                    <input id='referenceImage'
                        {...register('referenceImage')}
                        type='file'
                        onFocus={() => clearErrors('referenceImage')}
                        accept='image/*'
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