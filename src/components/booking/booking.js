import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'

// styling
const BookingStyles = styled.div`
    .booking {
        padding: 1rem 0.25rem;
        border: 1px solid red;
    }

    .bookingForm {
        width: 100%;
        display: flex;
        flex-direction: column;

        input, textarea {
            background-color: black;
            border: none;
            color: var(--header-footer-background);
            font-size: var(--nav-links);
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



const Booking = (props) => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm({
        mode: 'onBlur',
    })

    const submitAppointment = async (data) => {
        console.log(data.referenceImage)
        try {
            const requiredFields = ['clientname', 'clientphone', 'clientemail', 'clientdescription']
            const errorMessages = {
                clientname: 'name is required',
                clientphone: 'contact number is required',
                clientdescription: 'tattoo description is required',
            }

            requiredFields.forEach((field) => {
                if(!data[field] && (field !== 'email')) {
                    setError(field, { message: errorMessages[field] })
                }
            })

            if(data.referenceImage.length <= 0) {
                setError('referenceImage', { message: 'reference image is required' })
            }

            const imageToUpload = data.referenceImage[0]

            const s3 = new S3Client({
                region: process.env.REACT_APP_AWS_REGION,
                credentials: {
                    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
                },
            });

            const fileExtension = imageToUpload.name.split('.').pop();
            const fileName = `${data.clientname}_${uuidv4()}.${fileExtension}`;

            const params = {
                Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
                Key: fileName,
                Body: imageToUpload,
                ContentType: imageToUpload.type,
                // ACL: 'public-read',
            };

            const command = new PutObjectCommand(params);
            await s3.send(command);
            const url = `${process.env.REACT_APP_AWS_IMAGE_LINK}${fileName}`;

            delete data['referenceImage']
            data['imagelink'] = url

            const response = await axios({
                method : 'post',
                url : process.env.REACT_APP_AWS_LAMBDA,
                data : {...data},
            })

            console.log(response)

            
        } catch(error) {
            console.log(error)
        }
    }


    return (
        <BookingStyles>
            <div className='booking'>
                <p>Do you have a tattoo idea that you would like </p>
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
            </div>
        </BookingStyles>
    );
}

export default Booking;