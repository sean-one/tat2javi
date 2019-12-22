import React from 'react';

// styling
import './booking.css';

const Booking = (props) => {
    return (
        <div className='container'>
            <div className='apptWrapper'>
                <div className='pageTitle'>
                    <h1>Appointments</h1>
                </div>
                <form>
                    <input name='firstName' type='text' value='' placeholder='First Name' />
                    <input name='lastName' type='text' value='' placeholder='Last Name' />
                    <input name='phone' type='text' value='' placeholder='(123)456-7890' />
                    <input name='email' type='text' value='' placeholder='Email' />
                    <input name='placement' type='text' value='' placeholder='Tattoo body placement' />
                    <input name='description' type='text' value='' placeholder='Describe your tattoo idea' />
                </form>
            </div>
        </div>
    );
}

export default Booking;