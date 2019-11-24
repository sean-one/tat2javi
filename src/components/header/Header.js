import React from 'react';
import { Link } from 'react-router-dom';

//fontawesome menu icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

//images and styling
import scriptLogo from '../../images/black_fullscript.svg';
import './header.css';

const Header = (props) => {
    return (
        <header>
            <div className='navWrap'>
                <div className='branding'>
                    <Link to='/'><img src={scriptLogo} alt='tat2javi script' /></Link>
                </div>
                <div className='menuBar'>
                    <div className='menu'>
                        <span className='links'>
                            <Link to='/about'>About</Link>
                        </span>
                        <span className='links'>
                            <Link to='/portfolio'>Portfolio</Link>
                        </span>
                        <span className='links'>
                            <Link to='/calendar'>Calendar</Link>
                        </span>
                        <span className='links'>
                            <Link to='/appointment'>Appointment</Link>
                        </span>
                        <span className='links'>
                            <Link to='/contact'>Contact</Link>
                        </span>
                        <span className='links'>
                            <Link to='/shop'>Shop</Link>
                        </span>
                    </div>
                    <FontAwesomeIcon className='mobileMenu' icon={faBars} size='2x' onClick={props.menuToggle} />
                </div>
            </div>
        </header>
    );
}
 
export default Header;