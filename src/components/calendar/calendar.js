import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// components
import CalendarEvent from './events/eventCard';

// styling
const CalendarStyles = styled.div`
    .calendarWrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .eventsWrapper {
        padding: 3rem 0;
    }
`;

const Calendar = (props) => {
    const [eventsList, setEventsList] = useState([]);
    const [loading, setLoading] = useState(true)


    
    useEffect(() => {
        const events_google_script = 'https://script.google.com/macros/s/AKfycbwGvmmPJageAo9Bq1Buz8aD9BhrcdiDemkWXc5p2YgYMHcSShi7ARMTnm-1EiYVBdHopQ/exec'

        fetch(events_google_script)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`http error! Status: ${response.status}`)
                }

                return response.json();
            })
            .then(data => {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // start of today

                // fiilter out events past and filter any event without 'event_date'
                const validEvents = data.filter(event => {
                    if(!event.event_date) return false; // exclude any event without date
                    const eventDate = new Date(event.event_date);
                    return eventDate >= today
                })

                // sort events by date
                const sortedEvents = validEvents.sort((a, b) => {
                    const dateA = new Date(a.event_date);
                    const dateB = new Date(b.event_date);
                    return dateA - dateB;
                });

                setEventsList(sortedEvents)
            })
            .catch(error => {
                console.log('error getting data from google', error);
                setEventsList([])
            })
            .finally(() => setLoading(false));

    }, []);


    return (
        <CalendarStyles>
            <div className='calendarWrapper'>
                <h1>Upcoming Events</h1>
                <div className='eventsWrapper'>
                    {
                        loading ? (
                            <p>Loading events...</p>
                        ) : eventsList.length > 0 ? (
                            eventsList.map((event, index) => (
                                <CalendarEvent key={index} event={event} />
                            ))
                        ) : (
                            <p className='noEvents'>No Events at this time.  Check back later!</p>
                        )
                    }
                </div>
            </div>
            
        </CalendarStyles>
    );
}

export default Calendar;