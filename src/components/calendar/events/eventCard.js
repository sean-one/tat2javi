import React from 'react';
import styled from 'styled-components';

// styling
// import './events.css';
const EventCardStyles = styled.div`
    .eventCardWrapper {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        border-radius: 1.5rem;
        border: solid #364652 0.2rem;
        margin-bottom: 3.5rem;
    }

    .eventImage {
        display: flex;

        img {
            min-width: 100%;
        }
    }

    .eventDate {
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0.15rem 0.75rem;
        background-color: #364652;
    }
    
    .e_month {
        text-transform: uppercase;
        font-size: 1.5rem;
        border-bottom: solid #759aab 0.05rem;
    }

    .e_day {
        font-size: 2.5rem;
    }

    .detailsSection {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
    }

    .eventHeaderRow {
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
    }

    .e_title h2 {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 2rem;
        padding-left: 0.5rem;
    }

    .e_location {
        font-size: 1.4rem;
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

const EventCard = ({ event }) => {
    return (
        <EventCardStyles>
            <div className='eventCardWrapper'>
                <div className='eventImage'>
                    <img src={`${event?.event_image}`} alt='awesome tattoo event' />
                </div>
                <div className='detailsSection'>
                    <div className='eventHeaderRow'>
                        <div className='eventDate'>
                            <div className='e_month'>{event?.event_month}</div>
                            <div className='e_day'>{event?.event_day}</div>
                        </div>
                        <div className='e_title'>
                            <h2>{event?.event_title}</h2>
                        </div>
                    </div>
                    <div className='e_location'>
                        <p>{event?.event_location}</p>
                    </div>
                    <div className='e_time'>
                        <p>{event?.event_time}</p>
                    </div>
                    <div className='e_description'>
                        <p>{event?.event_description}</p>
                        <a href={event?.event_link} target='blank'>For more info click here.</a>
                    </div>
                </div>
            </div>
        </EventCardStyles>
    );
}

export default EventCard;