import React from 'react';

// styling
import './events.css';

const Events = (props) => {
    return (
        <div className='container'>
            <div className='eventCardWrapper'>
                <div className='eventImage'>
                    <img src='https://wtepullzone-20131.netdna-ssl.com/wp-content/uploads/2018/03/2019-Musink-Fest.jpg' alt='' />
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