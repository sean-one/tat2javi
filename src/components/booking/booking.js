import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import Resizer from 'react-image-file-resizer';
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
        opacity: 0.4;
        /* background-color: red; */
    }
`;


const Booking = (props) => {
    const [ selectedImage, setSelectedImage ] = useState(null)
    let navigate = useNavigate();

    const { register, handleSubmit, clearErrors, reset, watch, formState: { errors, isDirty } } = useForm({
        mode: 'onBlur',
        excludeEmptyString: true,
        shouldFocusError: false,
        shouldDisplayError: true,
    });

    const selectedFile = watch('referenceImage');

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

    const handleImageChange = (e) => {
        setSelectedImage(URL.createObjectURL(e.target.files[0]))
    }

    const submitAppointment = async (data) => {
        console.log(data)
        try {
            if (selectedFile) {
                const file = selectedFile[0];
    
                Resizer.imageFileResizer(
                    file,
                    700, // Max width of 700px
                    0, // Auto height
                    'PNG', // Output format as PNG
                    80,
                    0,
                    (resizedImage) => {
                        const reader = new FileReader();
                        reader.onload = () => {
                            const base64String = reader.result.split(',')[1]; // Extract base64 string from Data URL
                            data.referenceImage = base64String;
                            // Send data to the server or perform further actions
                        };
        
                        // Convert resizedImage to Blob
                        const blob = resizedImage.toBlob
                            ? resizedImage.toBlob()
                            : new Blob([resizedImage], { type: 'image/png' });
        
                        reader.readAsDataURL(blob);
                    },
                    'base64' // Use 'base64' for output type
                );
            }
            // send to lambda function, sending an email to booking
            const response = await axios({
                method : 'post',
                url : process.env.REACT_APP_AWS_LAMBDA,
                headers: {
                    'Content-Type': 'application/json'
                },
                data : data,
            })

            console.log(response)
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
                toast.error(`Network connection error: ${error.message}`, {
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
                            <img src={selectedImage} alt="Preview" style={{ width: '200px' }} />
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