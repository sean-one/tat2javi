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
                setEventsList(data)
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