import React from 'react';
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
    return (
        <CalendarStyles>
            <div className='calendarWrapper'>
                <h1>Upcoming Events</h1>
                <div className='eventsWrapper'>
                    <CalendarEvent />
                    <CalendarEvent />
                    <CalendarEvent />
                    <CalendarEvent />
                    <CalendarEvent />
                </div>
            </div>
            
        </CalendarStyles>
    );
}

export default Calendar;