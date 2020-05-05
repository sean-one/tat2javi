import React from 'react';

import ApptForm from './apptForm/apptForm.js';

// styling
import './appointment.css';

const Appointment = (props) => {
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
                        <ApptForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointment;