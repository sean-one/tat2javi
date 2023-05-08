import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import t2j from '../images/t2j_dark_50.PNG';

const GlobalStyle = createGlobalStyle`
    :root {
        /* --app-background: #2A282C; */
        --header: 7rem;
        --footer: 2.7rem;
        --header-footer-font: 'Oswald', sans-serif;
        /* --header-footer-background: #8F8D84; */
        --primary-text: 1.8rem;
        --h1text: 3.6rem;
        --nav-links: 18px;
        --max-container-width: 90rem;
        --input-background: #0E1111;
        
        --app-background: #0E1111;
        --container-background: rgba(14,17,17,0.6);
        --text-color: #E7EBE8;
        --header-footer-background: #757774;
        --header-footer-text-color: #0E1111;
        
        /* --app-background: black;
        --container-background: rgba(0,0,0,0.6);
        --text-color: #fdffff;
        --header-footer-background: #adb5bd;
        --header-footer-text-color: #0f0a0a; */
    }

    @media only screen and (max-width: 850px) {
        :root {
            --header: 5rem;
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
        background-color: var(--app-background);
    }
    
    .container {
        margin: 0 auto;
        min-height: calc(100vh - var(--header) - var(--footer));
        max-width: var(--max-container-width);
        background-color: var(--container-background);
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