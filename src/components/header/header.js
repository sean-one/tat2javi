import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//fontawesome menu icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

//images and styling
import scriptLogo from '../../images/tat2javi_written_100h.PNG';

const HeaderStyles = styled.div`
    header {
        width: 100%;
        height: var(--header);
        position: fixed;
        font-family: var(--header-footer-font);
        color: var(--header-footer-text);
        top: 0;
        left: 0;
        background-color: var(--header-footer-background);
        display: flex;
        justify-content: center;
        z-index: 99;
    }

    .navWrap {
        width: 100%;
        max-width: var(--max-container-width);
        display: flex;
        justify-content: space-between;
    }

    .tatjaviLogo {
        height: 100%;
        max-height: var(--header);
        width: 25%;
        display: flex;
        justify-content: flex-start;
        align-self: center;
        padding: 0.5rem 2rem;

        img {
            max-height: 100%;
            width: auto;
        }
    }

    nav {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0.5rem 2rem;
    }

    .menu {
        display: flex;

        @media only screen and (max-width: 850px) {
            display: none;
        }
    }

    .links {
        cursor: pointer;
        font-size: var(--nav-links);
        text-transform: uppercase;
        padding: 1rem 1.5rem;
    }

    .mobileMenu {
        @media only screen and (max-width: 850px) {
            position: absolute;
            top: var(--header);
            left: 0;
            width: 100vw;
            height: calc(100vh - var(--header));
            background-color: rgba(0,0,0,0.8);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;

            li {
                font-weight: bold;
                padding: 1rem 3rem;
            }
        }
    }

    .mobileIcon {
        display: none;
        color: black;

        @media only screen and (max-width: 850px) {
            display: block;
        }
    }
`;

const Header = (props) => {
    const [openMenu, setMenu] = useState(false);
    let navigate = useNavigate()

    const toggleMenu = e => {
        setMenu(!openMenu)
    }

    const navigateToPage = e => {
        if (openMenu) {
            setMenu(false);
        }
        navigate(`/${e.target.innerText.toLowerCase() }`)
    }

    return (
        <HeaderStyles>
            <header>
                <div className='navWrap'>
                    <div className='tatjaviLogo'>
                        <img onClick={navigateToPage} src={scriptLogo} alt='tat2javi script' />
                    </div>
                    <nav>
                        <ul className={openMenu ? 'menu mobileMenu' : 'menu'}>
                            <li onClick={navigateToPage} className='links'>about</li>
                            <li onClick={navigateToPage} className='links'>portfolio</li>
                            {/* <li onClick={navigateToPage} className='links'>calendar</li> */}
                            <li onClick={navigateToPage} className='links'>appointment</li>
                            <li onClick={navigateToPage} className='links'>shop</li>
                        </ul>
                        <div className='mobileIcon' onClick={toggleMenu}>
                            <FontAwesomeIcon icon={openMenu ? faTimes : faBars} size='2x' onClick={props.menuToggle} />
                        </div>
                    </nav>
                </div>
            </header>
        </HeaderStyles>
    );
}
 
export default Header;
