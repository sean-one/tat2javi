import React from 'react';

// components
import Albums from './albums/albums';

// styling
import './porfolio.css';

const Portfolio = (props) => {
    return (
        <div className='container'>
            <div className='pageTitle'>
                <h1>Portfolio</h1>
            </div>
            <div className='album'>
                <Albums />
            </div>
        </div>
    );
}

export default Portfolio;
