import React from 'react';
import { Route } from 'react-router-dom';

// components
import Categories from '../categories/categories';
import About from '../about/about';
import Portfolio from '../portfolio/portfolio';
import Calendar from '../calendar/calendar';
import Appointment from '../booking/booking';
import Contact from '../contact/contact';
import Shop from '../shop/shop';

// styling sheet
import './mainSection.css';

const mainSection = (props) => {
    return (
        <div className='mainSection'>
            <Route exact path='/' component={Categories} />
            <Route path='/about' component={About} />
            <Route path='/portfolio' component={Portfolio} />
            <Route path='/calendar' component={Calendar} />
            <Route path='/appointment' component={Appointment} />
            <Route path='/contact' component={Contact} />
            <Route path='/shop' component={Shop} />
        </div>
    );
}

export default mainSection;