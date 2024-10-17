import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
// import Resizer from 'react-image-file-resizer';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import axios from 'axios';

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
        display: flex;
        justify-content: center;
        
        img {
            width: 100%;
            max-width: 600px;
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
        opacity: 0.4;
        /* background-color: red; */
    }
`;


const Booking = (props) => {
    const [ selectedImage, setSelectedImage ] = useState('')
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

    const handleImageChange = async (e) => {
        
        const file = e.target.files[0];
    
        if(file) {
            try {
                const resizedImage = await resizeImage(file);
                setSelectedImage(resizedImage);
                
            } catch (error) {
                console.error('Image resizing failed:', error);
            }
        } else {
            setSelectedImage('');
        }
    }

    const resizeImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const image = new Image();
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxWidth = 600;
                    const scale = maxWidth / image.width;
                    const height = image.height * scale;
                    canvas.width = maxWidth;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0, maxWidth, height);
                    const resizedDataURL = canvas.toDataURL('image/png');
                    resolve(resizedDataURL);
                };
                image.onerror = (error) => {
                    reject(error);
                }
                image.src = event.target.result;
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file)
        });
    };

    const submitAppointment = async (data) => {
        try {
            // send to lambda function, sending an email to booking
            const response = await axios({
                method : 'post',
                url: 'https://3v54x67ol4.execute-api.us-east-1.amazonaws.com/development/tat2javi_booking',
                headers: {
                    'Content-Type': 'application/json'
                },
                data : { ...data, referenceImage: selectedImage },
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
                console.log(response)
                toast.error(`Network connection error`, {
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
                toast.error(`Network connection error: ${error.message}`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000 // 3 seconds
                });
            }
        }
    }


    return (
        <BookingStyles>
            <Helmet>
                <title>@Tat2Javi | Booking</title>
            </Helmet>
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
                        required: 'contact number is required',
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

                    {
                        selectedImage &&
                            <div className='uploadPreview'>
                                <img src={selectedImage} alt="Preview" />
                            </div>
                    }

                    <input {...register('referenceImage', {
                        validate: validateImage
                    })}
                        name='referenceImage'
                        type='file'
                        onFocus={() => clearErrors('referenceImage')}
                        onChange={handleImageChange}
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