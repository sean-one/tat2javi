import React, { Component } from 'react';
import { Route } from 'react-router-dom';

//components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
// import LandingPage from './components/LandingPage/LandingPage';
import Main from './components/mainbody/Main';
import About from './components/About/About';
// import Admin from './admin/admin';

// styling
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='outterWrap'>
          <Header />
          <div className='content'>
            {/* <Route exact path='/' component={About} /> */}
            <About />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
