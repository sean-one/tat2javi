import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
// import useImagePreview from '../../hooks/useImagePreview';

// styling
const BookingStyles = styled.div`
    .booking {
        padding: 1rem 0.25rem;
        border: 1px solid red;
    }

    .appointmentForm {
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
    // const { editImage, imagePreview, canvas } = useImagePreview();
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        mode: 'onBlur',
        // defaultValues: {
        //     clientname: '',
        //     clientphone: '',
        //     clientemail: '',
        //     clientdescription: ''
        // }
    })

    const submitAppointment = async (data) => {
        try {
            const requiredFields = ['clientname', 'clientphone', 'clientemail', 'clientdescription']
            const errorMessages = {
                clientname: 'required field',
                clientphone: 'required field',
                clientemail: 'required field',
                clientdescription: 'required field',
            }

            requiredFields.forEach((field) => {
                if(!data[field]) {
                    setError(field, { message: errorMessages[field] })
                }
            })
            console.log(data)

            

        } catch(error) {
            console.log(error)
        }
        // console.log(data)
    }

    console.log(errors)
    return (
        <BookingStyles>
            <div className='booking'>
                <p>Do you have a tattoo idea that you would like </p>
                <form onSubmit={handleSubmit(submitAppointment)} className='appointmentForm'>
                    
                    <input
                        {...register('clientname')}
                        type='text'
                        placeholder='Name'
                    />
                    {errors.clientname ? <div>{errors.clientname?.message}</div> : null}

                    <input
                        {...register('clientphone')}
                        type='number'
                        placeholder='Phone'
                    />
                    {errors.clientphone ? <div>{errors.clientphone?.message}</div> : null}

                    <input
                        {...register('clientemail')}
                        type='text'
                        placeholder='Email'
                    />
                    {errors.clientemail ? <div>{errors.clientemail?.message}</div> : null}

                    <textarea
                        {...register('clientdescription')}
                        type='text'
                        rows='10'
                        placeholder='Describe your tattoo idea and attach a reference image'
                    />
                    {errors.clientdescription ? <div>{errors.clientdescription?.message}</div> : null}

                    <input id='referenceImage'
                        {...register('referenceImage')}
                        type='file'
                        accept='image/*'
                    />
                    {errors.referenceImage ? <div>{errors.referenceImage?.message}</div> : null}

                    <button type='submit'>Submit</button>
                </form>
            </div>
        </BookingStyles>
    );
}

export default Booking;