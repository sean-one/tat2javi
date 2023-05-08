import React from 'react';
import styled from 'styled-components';

//styling
// import './footer.css';
const FooterStyles = styled.div`
    footer {
        text-align: center;
        font-family: var(--header-footer-font);
        height: var(--footer);
        color: var(--header-footer-text-color);
        background-color: var(--header-footer-background);
    }
`;

const Footer = () => {
    return (
        <FooterStyles>
            <footer>
                <p>&copy; 2023 Tat2Javi</p>
            </footer>
        </FooterStyles>
    );
}
 
export default Footer;
