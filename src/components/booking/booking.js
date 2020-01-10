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
                <div className='booking'>
                    <div className='bookingMedia'>
                        <div className='bookingImage'>
                            <img src='https://via.placeholder.com/500x100.png' alt='lowrider and tat2javi' />
                        </div>
                        <p>Do you have a tattoo idea that you would like </p>
                    </div>
                    <div className='bookingForm'>
                        <form>
                            <input name='name' type='text' value='' placeholder='Name' />
                            <input name='phone' type='number' value='' placeholder='Phone' />
                            <input name='email' type='text' value='' placeholder='Email' />
                            <textarea name='description' type='text' value='' placeholder='Describe your tattoo idea' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;