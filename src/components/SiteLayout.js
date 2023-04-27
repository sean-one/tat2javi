import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import t2j from '../images/t2j_dark_50.PNG';
import Javier from '../images/javier_folded_arms.png';

const GlobalStyle = createGlobalStyle`
    :root {
        --header: 7rem;
        --footer: 2.7rem;
        --main-padding: 2rem;
        --primary-text: 1.8rem;
        --h1text: 3.6rem;
        --nav-links: 1.4rem;
        --text-color: #F5F5F8;
        --max-container-width: 90rem;
    }

    @media only screen and (max-width: 850px) {
        :root {
            --header: 5.5rem;
            --main-padding: 0.75rem;
            --primary-text: 1.6rem;
            --h1text: 2.2rem;
            --nav-links: 2.8rem;
        }
    }
`

const SiteLayoutStyles = styled.div`
    .app {
        width: 100%;
        text-align: center;
        color: #fdffff;
        padding-top: var(--header);
        background-image: url(${t2j});
        /* background-image: url(${t2j}), url(${Javier}); */
        background-position: left -50px top -50px;
        /* background-position: left -50px top -50px, center; */
        /* background-repeat: repeat, no-repeat; */
        background-color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .container {
        width: 100%;
        min-height: calc(100vh - var(--header) - var(--footer));
        max-width: var(--max-container-width);
        /* display: flex;
        justify-content: center;
        align-items: center; */
        /* background-image: url(${Javier}); */
        background-size: cover;
        background-repeat: no-repeat;
        background-color: black;

    }

    /* heading at the top of each section/page */
    .pageTitle {
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }

`;

export const SiteLayout = (props) => {
    return (
        <SiteLayoutStyles>
            <GlobalStyle />
            <div className='siteLayoutContainter'>
                {props.children}
            </div>
        </SiteLayoutStyles>
    )
}