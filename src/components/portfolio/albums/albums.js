import React, { useState } from 'react';

// styling
import './albums.css';

const Albums = (props) => {
    const [viewLarge, setViewLarge] = useState(false);
    const [photoId, setPhotoId] = useState('');

    const openPhoto = (e) => {
        setViewLarge(true)
        setPhotoId(e.target.id)
        console.log('clickity click!', e.target.id);
    }

    const closeLarge = () => {
        setViewLarge(false);
    }

    return (
        <div className='albumWrapper'>
            {!viewLarge ? '' : 
                <div className='fullView'>
                    <div className='fullImage'>
                        <img src='https://via.placeholder.com/750' alt='full screen view' />
                    </div>
                    <div className='imageControl'>
                        <span>prev</span>
                        <span onClick={closeLarge}>close {photoId}</span>
                        <span>next</span>
                    </div>
                </div>
            }
            <div className='photos'>
                <img onClick={openPhoto} id='01' src='https://via.placeholder.com/150' alt='placeholder for later' />
                <img onClick={openPhoto} id='02' src='https://via.placeholder.com/150' alt='placeholder for later' />
                <img onClick={openPhoto} id='03' src='https://via.placeholder.com/150' alt='placeholder for later' />
                <img onClick={openPhoto} id='04' src='https://via.placeholder.com/150' alt='placeholder for later' />
                <img onClick={openPhoto} id='05' src='https://via.placeholder.com/150' alt='placeholder for later' />
                <img onClick={openPhoto} id='06' src='https://via.placeholder.com/150' alt='placeholder for later' />
                <img onClick={openPhoto} id='07' src='https://via.placeholder.com/150' alt='placeholder for later' />
                <img onClick={openPhoto} id='08' src='https://via.placeholder.com/150' alt='placeholder for later' />
                <img onClick={openPhoto} id='09' src='https://via.placeholder.com/150' alt='placeholder for later' />
                <img onClick={openPhoto} id='10' src='https://via.placeholder.com/150' alt='placeholder for later' />
                <img onClick={openPhoto} id='11' src='https://via.placeholder.com/150' alt='placeholder for later' />
                <img onClick={openPhoto} id='12' src='https://via.placeholder.com/150' alt='placeholder for later' />
                <img onClick={openPhoto} id='13' src='https://via.placeholder.com/150' alt='placeholder for later' />
                <img onClick={openPhoto} id='14' src='https://via.placeholder.com/150' alt='placeholder for later' />
                <img onClick={openPhoto} id='15' src='https://via.placeholder.com/150' alt='placeholder for later' />
            </div>
        </div>
    );
}

export default Albums;
