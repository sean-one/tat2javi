import React from 'react';
import styled from 'styled-components';

// styling
// import './events.css';
const EventCardStyles = styled.div`
    .eventCardWrapper {
        display: flex;
        padding: 2.5rem;
        border-radius: 2.5rem;
        border: solid #364652 0.2rem;
        margin-bottom: 3.5rem;
    }

    .eventDate {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 2rem;
    }

    .e_month {
        text-transform: uppercase;
        letter-spacing: 0.5rem;
        font-size: 3rem;
        padding: 1.5rem;
        border-bottom: solid #759aab 0.05rem;
    }

    .e_day {
        letter-spacing: 0.3rem;
        font-size: 5rem;
        padding: 1.5rem;
    }

    .eventDetails {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
        padding-left: 2rem;
    }

    .e_title h2 {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 2.8rem;
        padding: 1rem 0;
    }

    .e_location {
        font-size: 1.6rem;
    }

    .e_time {
        font-size: 1.2rem;
        font-weight: bold;
        color: grey;
    }

    .e_description {
        font-style: italic;
        letter-spacing: 0.05rem;
        line-height: 1.25;
        padding: 1rem 0;
        font-size: 1.4rem;
    }

    .e_description p {
        padding-bottom: 0.75rem;
    }
`;

const EventCard = (props) => {
    return (
        <EventCardStyles>
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
                        <p>read more...</p>
                    </div>
                </div>
            </div>
        </EventCardStyles>
    );
}

export default EventCard;