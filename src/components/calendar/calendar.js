import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

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
        const events_endpoint = 'https://script.google.com/macros/s/AKfycbyupujbQpIWx3NJ3t37B4JY0jDaU4ZeK5Kuhzt1ZNryqNTy9QuENWO8Z7yUOVqvu-pA/exec'

        fetch(events_endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`http error! Status: ${response.status}`)
                }

                return response.json();
            })
            .then(data => {
                // required fields event_date, event_title, event_location & active=true
                const activeEvents = Array.isArray(data.calendar)
                    ? data.calendar.filter(event => {
                        // confirm active event
                        const isActive = event && event.active === true;
                        // confirm required fields
                        const hasRequiredFields =
                            event.event_date && event.event_date.trim() !== '' && 
                            event.event_title && event.event_title.trim() !== '' && 
                            event.event_location && event.event_location.trim() !== '';
                        // check if event_date is today or in the future
                        const eventDate = new Date(event.event_date);
                        const nowToday = new Date();
                        const hasNotPassed = eventDate.setHours(0, 0, 0, 0) >= nowToday.setHours(0, 0, 0, 0);

                        // filter the events list
                        return isActive && hasRequiredFields && hasNotPassed;
                        })
                    : [];
                
                // sort events by date
                const sortedEvents = activeEvents.sort((a, b) => {
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
            <Helmet>
                <title>@Tat2Javi | Calendar</title>
            </Helmet>
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