import React, { Component } from 'react';

class AdminCalendar extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const today = new Date();
        today.toDateString();
        // console.log(`${today.getDay()}, ${today.getMonth()}, ${today.getDate()}, ${today.getFullYear()}`);
        const firstDay = new Date(`${today.getMonth() + 1}/1/${today.getFullYear()}`);
        const days = firstDay.getDay();
        firstDay.setDate( firstDay.getDate() - days);
        console.log(firstDay.toDateString());
    }

    render() {
        return (
            <div>
                <h1>calendar page</h1>
            </div>
        );
    }
}

export default AdminCalendar;
