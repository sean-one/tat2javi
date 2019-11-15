import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// components
import Header from './components/header/header';
import Categories from './components/categories/categories';
import About from './components/about/about';
import Footer from './components/footer/footer';
// import Admin from './admin/admin';

// styling
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <Route exact path='/' component={Categories} />
        <Footer />
      </div>
    );
  }
}

export default App;
