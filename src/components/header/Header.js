import React from 'react';
import HeaderSc from './HeaderSc'

//fontawesome menu icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

//images and styling
import scriptLogo from '../../images/black_fullscript.svg';
// import './Header.css';

const Header = (props) => {
    return (
        <HeaderSc>
            <div className='branding'>
                <img src={scriptLogo} alt='tat2javi script' />
            </div>
            <FontAwesomeIcon icon={faBars} size='3x' onClick={props.menuToggle} />
        </HeaderSc>
    );
}
 
export default Header;