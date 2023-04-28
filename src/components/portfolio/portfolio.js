import React from 'react';
import styled from 'styled-components';

import portfolio_image_01 from '../../images/portfolio_images/tat2javi_portfolio_01.png'
import portfolio_image_02 from '../../images/portfolio_images/tat2javi_portfolio_02.png'
import portfolio_image_03 from '../../images/portfolio_images/tat2javi_portfolio_03.png'
import portfolio_image_04 from '../../images/portfolio_images/tat2javi_portfolio_04.png'
import portfolio_image_05 from '../../images/portfolio_images/tat2javi_portfolio_05.png'
import portfolio_image_06 from '../../images/portfolio_images/tat2javi_portfolio_06.png'
import portfolio_image_07 from '../../images/portfolio_images/tat2javi_portfolio_07.png'
import portfolio_image_08 from '../../images/portfolio_images/tat2javi_portfolio_08.png'
import portfolio_image_09 from '../../images/portfolio_images/tat2javi_portfolio_09.png'
import portfolio_image_10 from '../../images/portfolio_images/tat2javi_portfolio_10.png'
import portfolio_image_11 from '../../images/portfolio_images/tat2javi_portfolio_11.png'
import portfolio_image_12 from '../../images/portfolio_images/tat2javi_portfolio_12.png'

// styling
const PortfolioStyles = styled.div`
    .portfolioGallery {
        padding: 1rem 0.25rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    }

    .portfolioImage {
        width: 100%;
        max-width: 250px;
        
        img {
            width: 100%;
            border: 1px solid var(--text-color);
            border-radius: 5px;
            display: block;
        }

        @media only screen and (max-width: 850px) {
            max-width: 500px;
        }
    }
`;


const Portfolio = (props) => {
    return (
        <PortfolioStyles>
            <div className='portfolioGallery'>
                <div className='portfolioImage'>
                    <img src={portfolio_image_01} alt='tat2javi portfolio work' />
                </div>
                <div className='portfolioImage'>
                    <img src={portfolio_image_02} alt='tat2javi portfolio work' />
                </div>
                <div className='portfolioImage'>
                    <img src={portfolio_image_03} alt='tat2javi portfolio work' />
                </div>
                <div className='portfolioImage'>
                    <img src={portfolio_image_04} alt='tat2javi portfolio work' />
                </div>
                <div className='portfolioImage'>
                    <img src={portfolio_image_05} alt='tat2javi portfolio work' />
                </div>
                <div className='portfolioImage'>
                    <img src={portfolio_image_06} alt='tat2javi portfolio work' />
                </div>
                <div className='portfolioImage'>
                    <img src={portfolio_image_07} alt='tat2javi portfolio work' />
                </div>
                <div className='portfolioImage'>
                    <img src={portfolio_image_08} alt='tat2javi portfolio work' />
                </div>
                <div className='portfolioImage'>
                    <img src={portfolio_image_09} alt='tat2javi portfolio work' />
                </div>
                <div className='portfolioImage'>
                    <img src={portfolio_image_10} alt='tat2javi portfolio work' />
                </div>
                <div className='portfolioImage'>
                    <img src={portfolio_image_11} alt='tat2javi portfolio work' />
                </div>
                <div className='portfolioImage'>
                    <img src={portfolio_image_12} alt='tat2javi portfolio work' />
                </div>
            </div>
            
        </PortfolioStyles>
    );
}

export default Portfolio;
