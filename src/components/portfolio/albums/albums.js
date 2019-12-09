import React, { useState } from 'react';

//fontawesome menu icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// styling
import './albums.css';

const Albums = (props) => {
    const [viewLarge, setViewLarge] = useState(false);
    const [photoId, setPhotoId] = useState(0);

    const openPhoto = (e) => {
        setViewLarge(true)
        setPhotoId(e.target.id)
        window.scrollTo(0,0);
        console.log('clickity click!', e.target.id);
    }

    const closeLarge = () => {
        setViewLarge(false);
    }

    const switchPix = (e) => {
        switch(e.target.id) {
            case 'prev':
                if (document.getElementById(photoId).previousSibling !== null) {
                    const prev = document.getElementById(photoId).previousSibling.id;
                    setPhotoId(prev)
                } else {
                    const last = document.getElementById(photoId).parentNode.lastChild.id;
                    setPhotoId(last);
                }
                break;
            case 'next':
                if (document.getElementById(photoId).nextSibling !== null) {
                    const next = document.getElementById(photoId).nextSibling.id;
                    setPhotoId(next);
                } else {
                    const first = document.getElementById(photoId).parentNode.firstChild.id;
                    setPhotoId(first);
                }
                break;
            default:
                break;
        }
    }

    return (
        <div className='albumWrapper'>
            {!viewLarge ? '' : 
                <div className='fullView'>
                    <div className='fullImage'>
                        <div className='controls'>
                            <FontAwesomeIcon icon={faChevronLeft} size='5x' onClick={switchPix} />
                        </div>
                        <img src='https://via.placeholder.com/645x850.png' alt='full screen view' />
                        <div className='controls'>
                            <FontAwesomeIcon icon={faChevronRight} size='5x' onClick={switchPix} />
                        </div>
                        <div className='controls closeTab'>
                            <FontAwesomeIcon icon={faTimes} size='2x' onClick={closeLarge} />
                        </div>
                    </div>
                    {/* <div className='imageControl'>
                        <div className='controls' onClick={switchPix} id='prev'>prev</div>
                        <div className='controls' onClick={closeLarge}>close {photoId}</div>
                        <div className='controls' onClick={switchPix} id='next'>next</div>
                    </div> */}
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
