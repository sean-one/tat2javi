import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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

    .disabledButton {
        cursor: not-allowed;
        background-color: red;
    }
`;


const Booking = (props) => {
    let navigate = useNavigate();

    const { register, handleSubmit, clearErrors, reset, formState: { errors, isDirty } } = useForm({
        mode: 'onBlur',
        excludeEmptyString: true,
        shouldFocusError: false,
        shouldDisplayError: true,
    });

    const validateImage = (file) => {
        if (file && file[0]) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const validSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file[0].type)) {
            return 'Only JPG, JPEG, PNG, and WEBP file types are allowed.';
        }

        if (file[0].size > validSize) {
            return 'The file size should be smaller than 5MB.';
        }
        }

        return true;
    };

    const submitAppointment = async (data) => {
        try {
            
            if(data.referenceImage.length > 0) {
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
                
                // set the s3 url to the imagelink
                data['imagelink'] = url

            } else {
                data['imagelink'] = 'no image attached'
            }

            // remove the file from the data object before sending to lambda
            delete data['referenceImage']

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
            console.log(error)
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


    return (
        <BookingStyles>
            <div className='booking'>
                <p>Send your contact and tattoo idea, and we can begin to bring your vision to life</p>
                <form onSubmit={handleSubmit(submitAppointment)} className='bookingForm' encType='multipart/form-data'>
                    
                    <input {...register('clientname', {
                        required: 'name field is required',
                        minLength: {
                            value: 3,
                            message: 'must be at least 3 letters'
                        },
                        pattern: {
                            value: /^[A-Za-z\s]+$/, // Regular expression for alphabetic characters and spaces
                            message: 'name must only include letters and spaces'
                        }
                    })}
                        type='text'
                        onFocus={() => clearErrors('clientname')}
                        placeholder='Name'
                    />
                    {errors.clientname ? <div className='formError'>{errors.clientname?.message}</div> : null}
                    
                    <input {...register('clientphone', {
                        required: 'need a number bud',
                        pattern: {
                            value: /^(\+?1[-.\s]?)?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$/, // US phone pattern validation
                            message: 'Please enter a valid U.S. phone number'
                        }
                    })}
                        type='tel'
                        onFocus={() => clearErrors('clientphone')}
                        placeholder='Phone'
                    />
                    {errors.clientphone && <div className='formError'>{errors.clientphone?.message}</div>}

                    <input {...register('clientemail', {
                        pattern: {
                            value: /^\S+@\S+$/i, // Email pattern validation
                            message: 'Please enter a valid email address'
                        }
                    })}
                        type='email'
                        onFocus={() => clearErrors('clientemail')}
                        placeholder='Email'
                    />
                    {errors.clientemail && <div className='formError'>{errors.clientemail?.message}</div>}

                    <textarea {...register('clientdescription', {
                        required: 'a description of your tattoo and placement is required',
                        minLength: {
                            value: 20,
                            message: 'more detailed information is needed'
                        }

                    })}
                        onFocus={() => clearErrors('clientdescription')}
                        rows='10'
                        placeholder='Please describe your idea for a tattoo and your ideas for the location of the tattoo'
                    />
                    {errors.clientdescription && <div className='formError'>{errors.clientdescription?.message}</div>}

                    <input {...register('referenceImage', {
                        validate: validateImage
                    })}
                    name='referenceImage'
                    type='file'
                    onFocus={() => clearErrors('referenceImage')}
                    accept='image/*'
                    />
                    {errors.referenceImage && <div className='formError'>{errors.referenceImage?.message}</div>}

                    <button className={`${!isDirty || Object.keys(errors).length > 0 ? 'disabledButton' : ''}`} type='submit' disabled={!isDirty || Object.keys(errors).length > 0}>Submit</button>
                </form>
                <ToastContainer />
            </div>
        </BookingStyles>
    );
}

export default Booking;