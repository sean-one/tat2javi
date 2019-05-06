import React, { Component } from 'react';

class AdminCalendar extends Component {
    constructor() {
        super();
        this.state = {
            today: new Date(),
            firstDay: this.getFirstDay()
        }
    }

    getFirstDay(){
        const today = new Date();
        const firstDay = new Date(`${today.getMonth() + 1}/1/${today.getFullYear()}`);
        const days = firstDay.getDay();
        firstDay.setDate( firstDay.getDate() - days);
        // return firstDay;
        console.log(firstDay.toDateString());
    }

    getCurrentMonth(month) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    }

    render() {
        return (
            <div>
                <h1>{this.getCurrentMonth(this.state.today.getMonth())}</h1>
            </div>
        );
    }
}

export default AdminCalendar;
