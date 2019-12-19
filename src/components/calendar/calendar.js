import React from 'react';

// components
import CalendarEvent from './events/events';

// styling
import './calendar.css';

const Calendar = (props) => {
    return (
        <div className='container'>
            <div className='calendarWrapper'>
                <div className='calendarTitle'>
                    <h1>Upcoming Events</h1>
                </div>
                <div className='eventsWrapper'>
                    <CalendarEvent />
                    <CalendarEvent />
                    <CalendarEvent />
                    <CalendarEvent />
                    <CalendarEvent />
                </div>
            </div>
            
        </div>
    );
}

export default Calendar;