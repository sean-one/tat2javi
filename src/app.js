import React from 'react';
import { Routes, Route } from 'react-router-dom';

// components
import Header from './components/header/header';

import Categories from './components/categories/categories';
import About from './components/about/about';
import Portfolio from './components/portfolio/portfolio';
import Calendar from './components/calendar/calendar';
import Appointment from './components/booking/booking';
import Contact from './components/contact/contact';
import Shop from './components/shop/shop';

import Footer from './components/footer/footer';

// styling
import './app.css';

const App = (props) => {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route exact path='/' element={<Categories />} />
        <Route path='/about' element={<About />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/shop' element={<Shop />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
