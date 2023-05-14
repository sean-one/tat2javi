import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
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
        mode: 'onBlur',
        // resolver: yupResolver(bookingSchema),
    });

    const submitAppointment = async (data) => {
        console.log('inside submit')
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


    console.log('errors')
    console.log(errors)
    return (
        <BookingStyles>
            <div className='booking'>
                <p>Send your contact and tattoo idea, and we can begin to bring your vision to life</p>
                <form onSubmit={handleSubmit(submitAppointment)} className='bookingForm' encType='multipart/form-data'>
                    
                    <Controller name='clientname'
                        control={control}
                        defaultValue=''
                        rules={{
                            required: 'Please enter your name'
                        }}
                        render={({ field }) => (
                            <input id='clientname'
                                {...field}
                                type='text'
                                onFocus={() => clearErrors('clientname')}
                                placeholder='Name'
                            />
                        )}
                    />
                    {errors.clientname && <div className='formError'>{errors.clientname?.message}</div>}
                    
                    <Controller name="clientphone"
                        control={control}
                        defaultValue=''
                        rules={{
                            required: 'Please enter your phone number',
                            pattern: {
                                value: /^\d{10}$/,
                                message: "Please enter a valid phone number"
                            }
                        }}
                        render={({ field }) => (
                            <input id='clientphone'
                                {...field}
                                type='text'
                                onFocus={() => clearErrors('clientphone')}
                                placeholder='Phone'
                            />
                        )}
                    />
                    {errors.clientphone && <div className='formError'>{errors.clientphone?.message}</div>}

                    <Controller name="clientemail"
                        control={control}
                        defaultValue=''
                        rules={{
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Please enter a valid email address"
                            }
                        }}
                        render={({ field }) => (
                            <input id='clientemail'
                                {...field}
                                type='email'
                                onFocus={() => clearErrors('clientphone')}
                                placeholder='Email'
                            />
                        )}
                        
                    />
                    {errors.clientemail && <div className='formError'>{errors.clientemail?.message}</div>}

                    <Controller name="clientdescription"
                        control={control}
                        defaultValue=''
                        rules={{ required: 'Please include tattoo description and location' }}
                        render={({ field }) => (
                            <textarea id='clientdescription'
                                {...field}
                                onFocus={() => clearErrors('clientdescription')}
                                rows='10'
                                placeholder='Please describe your idea for a tattoo and your ideas for the location of the tattoo'
                            />
                        )}
                    />
                    {errors.clientdescription && <div className='formError'>{errors.clientdescription?.message}</div>}

                    <Controller name="referenceImage"
                        control={control}
                        defaultValue={null}
                        rules={{
                            validate: {
                                maxSize: (files) =>
                                    !files || 
                                    (files[0] && files[0].size <= 5 * 1024 * 1024 * 1024),
                                allowedTypes: (files) =>
                                    !files ||
                                    (files[0] && /(\.jpg|\.jpeg|\.png|\.webp)$/i.test(files[0].name)),
                            }
                        }}
                        render={({ field: { onChange } }) => (
                            <input
                                type='file'
                                onChange={(e) => onChange(e.target.files)}
                                onFocus={() => clearErrors('referenceImage')}
                                accept='image/*'
                            />
                        )}
                    />
                    {(errors.referenceImage && (errors.referenceImage.type === 'maxSize')) && <div className='formError'>File size should be less than 5GB</div>}
                    {(errors.referenceImage && (errors.referenceImage.type === 'allowedTypes')) && <div className='formError'>Only JPG, JPEG, PNG, and WebP files are allowed</div>}

                    <button type='submit'>Submit</button>
                </form>
                <ToastContainer />
            </div>
        </BookingStyles>
    );
}

export default Booking;