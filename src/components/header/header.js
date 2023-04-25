import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//fontawesome menu icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

//images and styling
import scriptLogo from '../../images/black_fullscript.svg';
import './header.css';

const Header = (props) => {
    const [openMenu, setMenu] = useState(false);

    const toggleMenu = e => {
        setMenu(!openMenu)
    }

    const closeMenu = e => {
        if (openMenu) {
            setMenu(false);
        }
    }

    return (
        <header>
            <div className='container navWrap'>
                <div className='branding'>
                    <Link to='/'><img id='brandImage' onClick={closeMenu} src={scriptLogo} alt='tat2javi script' /></Link>
                </div>
                <nav>
                    <ul className={openMenu ? 'menu mobileMenu' : 'menu'}>
                        <Link to='/about'><li onClick={closeMenu} className='links'>About</li></Link>
                        <Link to='/portfolio'><li onClick={closeMenu} className='links'>Portfolio</li></Link>
                        <Link to='/calendar'><li onClick={closeMenu} className='links'>Calendar</li></Link>
                        <Link to='/appointment'><li onClick={closeMenu} className='links'>Appointment</li></Link>
                        <Link to='/shop'><li onClick={closeMenu} className='links'>Shop</li></Link>
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
