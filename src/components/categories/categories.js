import React from 'react';
import { Link } from 'react-router-dom';

// styling
import './categories.css';

const Categories = (props) => {
    return (
        <div className='categories'>
            <Link to='/about'>
                <div className='category about'>
                    <p className='linkHead'>About</p>
                </div>
            </Link>
            <Link to='/portfolio'>
                <div className='category portfolio'>
                    <p className='linkHead'>Portfolio</p>
                </div>
            </Link>
            <Link to='/calendar'>
                <div className='category calendar'>
                    <p className='linkHead'>Calendar</p>
                </div>
            </Link>
            <Link to='/appointment'>
                <div className='category appointment'>
                    <p className='linkHead'>Appointment</p>
                </div>
            </Link>
            <Link to='/shop'>
                <div className='category shop'>
                    <p className='linkHead'>Shop</p>
                </div>
            </Link>
        </div>
    );
}

export default Categories;