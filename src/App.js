import React, { Component } from 'react';
import { Route } from 'react-router-dom';

//components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
// import LandingPage from './components/LandingPage/LandingPage';
import Main from './components/mainbody/Main';
// import Admin from './admin/admin';

// styling
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
         <div className='content'>
          {/* <Route exact path='/' component={LandingPage} /> */}
          <Route exact path='/' component={Main} />
          {/* <Route path='/admin' component={Admin} /> */}
         </div>
        <Footer />
      </div>
    );
  }
}

export default App;
