import React, { Component } from 'react';
import { Route } from 'react-router-dom';

//components
import Header from './components/header/header';
import About from './components/about/about';
import Footer from './components/footer/footer';
// import Admin from './admin/admin';

// styling
import './app.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='outterWrap'>
          <Header />
          {/* <div className='content'> */}
            {/* <Route exact path='/' component={About} /> */}
            {/* <About /> */}
          {/* </div> */}
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}

export default App;
