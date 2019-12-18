import React from 'react';

// components
import Header from './components/header/header';
import MainSection from './components/mainSection/mainSection';
import Footer from './components/footer/footer';
// import Admin from './admin/admin';

// styling
import './app.css';

const App = (props) => {
  return (
    <div className='app'>
      <Header />
      <MainSection />
      <Footer />
    </div>
  );
}

export default App;
