import React from 'react';
import { Link } from 'react-router-dom';

//fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitterSquare, faSnapchat } from '@fortawesome/free-brands-svg-icons';

import bgLogo from '../../images/t2j_white2.png';

//styling
import './LandingPage.css';

// const facebook = <FontAwesomeIcon icon={fab} />

const LandingPage = () => {
    return (
        <div className='landing'>
            <Link to='/home'><div className='enterButton'>ENTER</div></Link>
            <img src={bgLogo} alt='' />
            <div className='socialIcons'>
                <FontAwesomeIcon icon={faFacebook} size='3x' />
                <FontAwesomeIcon icon={faInstagram} size='3x'/>
                <FontAwesomeIcon icon={faTwitterSquare} size='3x'/>
                <FontAwesomeIcon icon={faSnapchat} size='3x'/>
            </div>
        </div>
    );
}
 
export default LandingPage;