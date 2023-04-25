import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Tat2Javi from '../images/tat2javi.png';

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
        background-color: black;
        background-position: left -50px top -50px;
        background-image: url(${Tat2Javi});
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .container {
        width: 100%;
        min-height: calc(100vh - var(--header) - var(--footer));
        max-width: var(--max-container-width);
    }

    /* heading at the top of each section/page */
    .pageTitle {
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }

    input, textarea {
        background-color: #011627;
        border: none;
        border-bottom: 0.02rem solid #364652;
        text-transform: uppercase;
        margin: 1rem 0.5rem;
        width: 100%;
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