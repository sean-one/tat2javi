import React from 'react';
import { Routes, Route } from 'react-router-dom';

// components
import { SiteLayout } from './components/SiteLayout';
import Header from './components/header/header';

import Landing from './components/landing/landing';
import Categories from './components/categories/categories';
import About from './components/about/about';
import Portfolio from './components/portfolio/portfolio';
// import Calendar from './components/calendar/calendar';
import Booking from './components/booking/booking';
import Shop from './components/shop/shop';

import Footer from './components/footer/footer';


const App = (props) => {
  return (
    <SiteLayout>
      <div className='app'>
        <Header />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route path='/tat2javi' element={<Categories />} />
            <Route path='/about' element={<About />} />
            <Route path='/portfolio' element={<Portfolio />} />
            {/* <Route path='/calendar' element={<Calendar />} /> */}
            <Route path='/booking' element={<Booking />} />
            <Route path='/shop' element={<Shop />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </SiteLayout>
  );
}

export default App;
