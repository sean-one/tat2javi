import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//fontawesome menu icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

//images and styling
import scriptLogo from '../../images/black_fullscript.svg';
import './header.css';

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
        <header>
            <div className='navWrap'>
                <div className='branding'>
                    <img id='brandImage' onClick={navigateToPage} src={scriptLogo} alt='tat2javi script' />
                </div>
                <nav>
                    <ul className={openMenu ? 'menu mobileMenu' : 'menu'}>
                        <li onClick={navigateToPage} className='links'>About</li>
                        <li onClick={navigateToPage} className='links'>Portfolio</li>
                        <li onClick={navigateToPage} className='links'>Calendar</li>
                        <li onClick={navigateToPage} className='links'>Appointment</li>
                        <li onClick={navigateToPage} className='links'>Shop</li>
                    </ul>
                    <div className='mobileIcon' onClick={toggleMenu}>
                        <FontAwesomeIcon icon={openMenu ? faTimes : faBars} size='2x' onClick={props.menuToggle} />
                    </div>
                </nav>
            </div>
        </header>
    );
}
 
export default Header;
