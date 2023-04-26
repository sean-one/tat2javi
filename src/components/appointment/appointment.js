import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

// styling
const AppointmentStyles = styled.div`
    .booking {
        border: 1px solid red;
    }
    .appointmentForm {
        input, textarea {
            width: 100%;
            background-color: #011627;
            border: none;
            border-bottom: 1px solid #364652;
            text-transform: uppercase;
            margin: 0.5rem;
            padding: 0.5rem 1rem;
        }
    }
`;


const Appointment = (props) => {
    const { register, handleSubmit } = useForm({
        mode: 'onBlur',
    })

    const submitAppointment = async (data) => {
        console.log(data)
    }


    return (
        <AppointmentStyles>
            <div className='pageTitle'>
                <h1>Appointments</h1>
            </div>

            <div className='booking'>
                <p>Do you have a tattoo idea that you would like </p>
                <form onSubmit={handleSubmit(submitAppointment)} className='appointmentForm'>
                    
                    <input id='name'
                        {...register('name')}
                        type='text'
                        placeholder='Name'
                    />

                    <input id='phone'
                        {...register('phone')}
                        type='number'
                        placeholder='Phone'
                    />

                    <input id='email'
                        {...register('email')}
                        type='text'
                        placeholder='Email'
                    />

                    <textarea id='description'
                        {...register('description')}
                        type='text'
                        rows='10'
                        placeholder='Describe your tattoo idea'
                    />


                    <button type='submit'>Submit</button>
                </form>
            </div>
        </AppointmentStyles>
    );
}

export default Appointment;