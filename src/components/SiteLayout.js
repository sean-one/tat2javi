import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import t2j from '../images/t2j_dark_50.PNG';
import Javier from '../images/javier_folded_arms.png';

const GlobalStyle = createGlobalStyle`
    :root {
        --header: 7rem;
        --footer: 2.7rem;
        --header-footer-text: #0f0a0a;
        --header-footer-font: 'Oswald', sans-serif;
        --header-footer-background: #adb5bd;
        --main-padding: 2rem;
        --primary-text: 1.8rem;
        --h1text: 3.6rem;
        --nav-links: 18px;
        --text-color: #fdffff;
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
        color: var(--text-color);
        padding-top: var(--header);
        background-image: url(${t2j});
        background-position: left -50px top -50px;
        background-color: black;
        border: 1px solid red;
        
    }
    
    .container {
        margin: 0 auto;
        min-height: calc(100vh - var(--header) - var(--footer));
        max-width: var(--max-container-width);
        background-color: rgba(0,0,0,0.6);
        border: 1px solid blue;

    }

    /* heading at the top of each section/page */
    .pageTitle {
        width: 100%;
        display: flex;
        justify-content: flex-start;

        h1 {
            font-size: var(--h1text);
            color: #759aab;
            font-weight: bold;
            padding: 2rem 0.75rem;
            letter-spacing: 0.5rem;
        }
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