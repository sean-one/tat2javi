import React from 'react';

// styling
import './events.css';

const Events = (props) => {
    return (
        <div className='container'>
            <div className='eventCardWrapper'>
                <div className='eventDate'>
                    <div className='e_month'>jan</div>
                    <div className='e_day'>23</div>
                </div>
                <div className='eventImage'>
                    <img src='https://via.placeholder.com/225x300.png' alt='awesome tattoo event' />
                </div>
                <div className='eventDetails'>
                    <div className='e_title'>
                        <h2>Awesome Tattoo Event</h2>
                    </div>
                    <div className='e_location'>
                        <p>12345 South Road Way, Metroville, JK 98765</p>
                    </div>
                    <div className='e_time'>
                        <p>12:00n - 10:00pm</p>
                    </div>
                    <div className='e_description'>
                        <p>Ex qui consequat irure qui Lorem ad commodo velit eu. Laborum nostrud mollit mollit non commodo. Fugiat reprehenderit commodo minim laborum quis est commodo ullamco amet enim ullamco magna.</p>
                        <a href='#'>read more...</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

{/* <img src='https://via.placeholder.com/200x350.png' alt='' /> */}
export default Events;