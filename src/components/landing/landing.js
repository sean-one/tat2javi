import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tat2Javi from '../../images/t2j_white2.png'

import styled from 'styled-components';

const LandingStyles = styled.div`
    .landing {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .landingImage {
        width: 100%;
        max-width: 300px;

        img {
            width: 100%;
            display: block;
        }
    }

    .enterButton {
        cursor: pointer;
        margin-top: 2rem;
        padding: 1rem 2.5rem;
        background-color: black;
        border: 1px solid white;
        border-radius: 5px;
    }
`;


const Landing = () => {
    let navigate = useNavigate()


    return (
        <LandingStyles>
            <div className='landing'>
                <div className='landingImage'>
                    <img src={Tat2Javi} alt='Tat2Javi T2J logo'/>
                </div>
                <div className='enterButton' onClick={() => navigate('/tat2javi')}>Enter</div>
            </div>
        </LandingStyles>
    )
}

export default Landing;