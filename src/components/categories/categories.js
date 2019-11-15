import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// styling
import './categories.css';

const Categories = (props) => {
    return (
        <div className='categories'>
            <Link to='/about'>
                <div className='category about'>
                </div>
            </Link>
            <Link to='/portfolio'>
                <div className='category portfolio'>
                </div>
            </Link>
            <Link to='/calendar'>
                <div className='category calendar'>
                </div>
            </Link>
            <Link to='/book'>
                <div className='category book'>
                </div>
            </Link>
            <Link to='/contact'>
                <div className='category contact'>
                </div>
            </Link>
            <Link to='/shop'>
                <div className='category shop'>
                </div>
            </Link>
        </div>
    );
}

export default Categories;