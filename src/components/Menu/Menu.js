import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {MenuSc, Links} from './MenuSc'

class Menu extends Component {
    render() {
        return (
            <MenuSc>
                <Links>
                    <span className='links'>
                        <Link to='/home'>Home</Link>
                    </span>
                    <span className='links'>
                        <Link to='/portfolio'>Portfolio</Link>
                    </span>
                    <span className='links'>
                        <Link to='/shop'>Shop</Link>
                    </span>
                    <span className='links'>
                        <Link to='/book'>Schedule Appt.</Link>
                    </span>
                    <span className='links'>
                        <Link to='/contact'>Contact</Link>
                    </span>
                    <span className='links'>
                        <Link to='/social'>Social Media</Link>
                    </span>
                </Links>
            </MenuSc>
        )
    }
}

export default Menu;
