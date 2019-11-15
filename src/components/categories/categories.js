import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// styling
import './categories.css';

const Categories = (props) => {
    return (
        <div className='categories'>
            <Link to='/about'>
                <div className='category about'>
                    <p>About</p>
                </div>
            </Link>
            <Link to='/portfolio'>
                <div className='category portfolio'>
                    <p>Portfolio</p>
                </div>
            </Link>
            <Link to='/calendar'>
                <div className='category calendar'>
                    <p>Calendar</p>
                </div>
            </Link>
            <Link to='/book'>
                <div className='category book'>
                    <p>Appointment</p>
                </div>
            </Link>
            <Link to='/contact'>
                <div className='category contact'>
                    <p>Contact</p>
                </div>
            </Link>
            <Link to='/shop'>
                <div className='category shop'>
                    <p>Shop</p>
                </div>
            </Link>
        </div>
    );
}

export default Categories;