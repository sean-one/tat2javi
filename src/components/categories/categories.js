import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import about_link_image from '../../images/categories/about_image_link.JPG';
import portfolio_link_image from '../../images/categories/portfolio_image_link.JPG';
import booking_link_image from '../../images/categories/booking_image_link.JPG';
import shop_link_image from '../../images/categories/shop_image_link.png';
import calendar_link_image from '../../images/categories/calendar_image_link.png';

// styling
const CategoriesStyles = styled.div`
    .categories {
        width: 100%;
        display: flex;
        flex-direction: column;
        
        @media only screen and (max-width: 850px) {
            width: 100%;
        }
    }

    .category {
        cursor: pointer;
        width: 100%;
        max-width: var(--max-container-width);
        height: 28rem;
        filter: grayscale(100%);
        margin: 0.5rem 0 0.5rem 0;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        display: flex;
        align-items: flex-end;

        @media only screen and (max-width: 850px) {
            width: 100%;
            height: calc((100vh - var(--header) - var(--footer)) * 0.25);
        }
    }

    .category:hover {
        filter: none;
    }

    .linkHead {
        background-color: rgba(0,0,0,0.6);
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-weight: bold;
        margin-left: 2rem;
        margin-bottom: 2.5rem;
        font-size: var(--nav-links);
        color: var(--header-footer-background);
        text-transform: uppercase;
        letter-spacing: 3;

        @media only screen and (max-width: 850px) {
            margin-bottom: 1.5rem;
        }
    }

    .about {
        background-image: url(${about_link_image});
    }
    
    .booking {
        background-image: url(${booking_link_image});
    }

    .portfolio {
        background-image: url(${portfolio_link_image})
    }

    .calendar {
        background-image: url(${calendar_link_image});
    }
    
    .shop {
        background-image: url(${shop_link_image});
    }

`;


const Categories = (props) => {
    let navigate = useNavigate()


    return (
        <CategoriesStyles>
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
                <div className='category booking' onClick={() => navigate('/booking')}>
                    <p className='linkHead'>Booking</p>
                </div>
                <div className='category shop' onClick={() => navigate('/shop')}>
                    <p className='linkHead'>Shop</p>
                </div>
            </div>
        </CategoriesStyles>
    );
}

export default Categories;