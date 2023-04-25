import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CVGraff from '../../images/categories/cvGraff.png';
import InkzShop from '../../images/categories/inkzShop.jpg';
import Desert74 from '../../images/categories/desert74.png';

// styling
const CategoriesStyles = styled.div`
    .categories {
        width: 100%;
        display: flex;
        flex-direction: column;
        width: 100%;

        @media only screen and (max-width: 850px) {
            width: 100%;
        }
    }

    .category {
        width: 100%;
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
            height: 13.5rem;
        }
    }

    .category:hover {
        filter: none;
    }

    .linkHead {
        font-weight: bold;
        margin-left: 2rem;
        margin-bottom: 2.5rem;
        font-size: 2.2rem;
        text-transform: uppercase;
        letter-spacing: 3;

        @media only screen and (max-width: 850px) {
            margin-bottom: 1.5rem;
            font-size: 2rem;
        }
    }

    .about, .appointment {
        background-image: url(${CVGraff});
    }

    .portfolio, .contact {
        background-image: url(${InkzShop});
    }

    .calendar, .shop {
        background-image: url(${Desert74});
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
                <div className='category appointment' onClick={() => navigate('/appointment')}>
                    <p className='linkHead'>Appointment</p>
                </div>
                <div className='category shop' onClick={() => navigate('/shop')}>
                    <p className='linkHead'>Shop</p>
                </div>
            </div>
        </CategoriesStyles>
    );
}

export default Categories;