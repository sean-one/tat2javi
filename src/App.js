import React, { Component } from 'react';
import { Route } from 'react-router-dom';

//components
import LandingPage from './components/LandingPage/LandingPage';
import Main from './components/mainbody/Main';
import Admin from './admin/admin';

// styling
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Main} />
        <Route path='/admin' component={Admin} />
      </div>
    );
  }
}

export default App;
