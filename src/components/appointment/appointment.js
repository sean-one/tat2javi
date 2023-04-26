import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

// import ApptForm from './apptForm/apptForm.js';

// styling
// import './appointment.css';
const AppointmentStyles = styled.div``;


const Appointment = (props) => {
    const { register, handleSubmit } = useForm({
        mode: 'onBlur',
    })

    const submitBooking = async (data) => {
        console.log(data)
    }


    return (
        <AppointmentStyles>
            <div className='apptWrapper'>
                <div className='pageTitle'>
                    <h1>Appointments</h1>
                </div>
                <div className='booking'>
                    <div className='bookingMedia'>
                        <div className='bookingImage'>
                            <img src='https://via.placeholder.com/500x100.png' alt='lowrider and tat2javi' />
                        </div>
                        <p>Do you have a tattoo idea that you would like </p>
                    </div>
                    <div className='bookingForm'>
                        <form onSubmit={handleSubmit(submitBooking)}>
                            <input
                                id='name'
                                {...register('name')}
                                type='text'
                                placeholder='Name'
                            />
                            <input
                                id='phone'
                                {...register('phone')}
                                type='number'
                                placeholder='Phone'
                            />
                            <input
                                id='email'
                                {...register('email')}
                                type='text'
                                placeholder='Email'
                            />
                            <input
                                id='work'
                                {...register('work')}
                                type='text'
                                placeholder='Work'
                            />
                            <textarea
                                id='description'
                                {...register('description')}
                                type='text'
                                placeholder='Describe your tattoo idea'
                            />
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </AppointmentStyles>
    );
}

export default Appointment;