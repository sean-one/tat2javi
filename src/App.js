import React, { Component } from 'react';
import { Route } from 'react-router-dom';

//components
import LandingPage from './components/LandingPage/LandingPage';
import Main from './components/mainbody/Main';

// styling
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Main} />
      </div>
    );
  }
}

export default App;
