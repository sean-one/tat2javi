import React from 'react';

// styling
import './events.css';

const Events = (props) => {
    return (
        <div className='container'>
            <div className='eventCardWrapper'>
                <div className='eventImage'>
                    <img src='https://via.placeholder.com/200x350.png' alt='' />
                </div>
                <div className='eventDetails'>
                    <div className='eventHeader'>
                        <div className='eventTitle'>
                            <h2>Musink Tattoo Convention Music Festival</h2>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Events;