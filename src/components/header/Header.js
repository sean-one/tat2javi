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
        // console.log('click');
    }

    return (
        <header>
            <div className='navWrap'>
                <div className='branding'>
                    <Link to='/'><img src={scriptLogo} alt='tat2javi script' /></Link>
                </div>
                <nav>
                    <ul className={openMenu ? 'menu mobileMenu' : 'menu'}>
                        <Link to='/about'><li className='links'>About</li></Link>
                        <Link to='/portfolio'><li className='links'>Portfolio</li></Link>
                        <Link to='/calendar'><li className='links'>Calendar</li></Link>
                        <Link to='/appointment'><li className='links'>Appointment</li></Link>
                        <Link to='/contact'><li className='links'>Contact</li></Link>
                        <Link to='/shop'><li className='links'>Shop</li></Link>
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