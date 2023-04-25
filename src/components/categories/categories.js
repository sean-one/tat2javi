import React from 'react';
import { useNavigate } from 'react-router-dom';

// styling
import './categories.css';

const Categories = (props) => {
    let navigate = useNavigate()


    return (
        <div className='categories'>
            <div className='category about' onClick={() => navigate('/about')}>
                <p className='linkHead'>About</p>
            </div>
            <div className='category portfolio' onClick={() => navigate('/portfolio')}>
                <p className='linkHead'>Portfolio</p>
            </div>
            <div className='category calendar' onClick={() => navigate('/calendar')}>
                <p className='linkHead'>Calendar</p>
            </div>
            <div className='category appointment' onClick={() => navigate('/appointment')}>
                <p className='linkHead'>Appointment</p>
            </div>
            <div className='category shop' onClick={() => navigate('/shop')}>
                <p className='linkHead'>Shop</p>
            </div>
        </div>
    );
}

export default Categories;