import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Tat2Javi from '../../images/t2j_white2.png'
import Tat2Javi from '../../images/t2j_blackbox.png'
import t2j from '../../images/t2j_dark_50.PNG';

import styled from 'styled-components';


const LandingStyles = styled.div`
    .landing {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        /* background-image: url(${t2j}); */
        background-color: var(--app-background);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 100;
        overflow: auto;
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
        margin-top: 5rem;
        padding: 1rem 2.5rem;
        background-color: var(--app-background);
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