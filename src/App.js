import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Tat2Javi_Meta from '../src/images/meta_tag_imgs/og_meta-social.webp';

// components
import { SiteLayout } from './components/SiteLayout';
import Header from './components/header/header';

import Landing from './components/landing/landing';
import Categories from './components/categories/categories';
import About from './components/about/about';
import Portfolio from './components/portfolio/portfolio';
import Calendar from './components/calendar/calendar';
import Booking from './components/booking/booking';
import Shop from './components/shop/shop';

import Footer from './components/footer/footer';

require('dotenv').config()

const App = (props) => {
  return (
    <SiteLayout>
      <Helmet>
        <title>@Tat2Javi | California</title>
        <meta name='description' content='tat2javi website' />
        <meta name='keywords' content='tat2javi, tat 2 javi, tattoo javi, tattoo, art, ink, lettering, script' />
        <meta name='robots' content='index, follow' />

        {/* Open Graph tags */}
        <meta property='og:title' content='Tat2Javi' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://tat2javi.com' />
        <meta property='og:image' content={Tat2Javi_Meta} />
        <meta property='og:description' content='tat2javi website' />
      </Helmet>
      <div className='app'>
        <Header />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route path='/tat2javi' element={<Categories />} />
            <Route path='/about' element={<About />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/calendar' element={<Calendar />} />
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
