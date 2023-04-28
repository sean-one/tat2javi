import React from 'react';
import styled from 'styled-components';

import Javier from '../../images/javi_folded_crop-w_500.png';

// styling
const AboutStyles = styled.div`
    .aboutWrapper {
        display: flex;
        justify-content: space-between;

        @media only screen and (max-width: 850px) {
            flex-direction: column-reverse;
            align-items: center;

        }
    }

    .aboutImage {
        width: 100%;
        max-width: 400px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
            display: block;
        }

    }

    .aboutSection {
        align-self: center;
        font-size: var(--primary-text);
        max-width: 55%;
        padding: 0.5rem 0.75rem;
        text-align: justify;
        letter-spacing: 0.2px;
        line-height: 2;

        @media only screen and (max-width: 850px) {
            max-width: 100%;
            text-align: center;
            line-height: 1.35;
            padding: 2rem 1rem 0;
        }
    }
`;


const About = (props) => {
    return (
        <AboutStyles>
            <div className='aboutWrapper'>
                {/* <div className='pageTitle'>
                    <h1>About</h1>
                </div> */}
                <div className='aboutImage'>
                    <img src={Javier} alt='Tat2Javi standing with his arms crossed' />
                </div>
                <div className='aboutSection'>
                    <p>Get to know 'Tat2Javi' - the talented self-taught tattoo artist from Riverside, California. With a passion for sketching and drawing that started at a young age, he found inspiration in the Chicano lifestyle and the featured artwork in Teen Angel Magazines. Tattooing with a "prison rig" at 16, he worked tirelessly to improve his craft while juggling odd jobs to make ends meet. Today, he travels the world attending tattoo conventions, seeking inspiration from other artists and challenging himself artistically. With years of experience under his belt, Tat2Javi is dedicated to his craft and ready to bring your tattoo ideas to life.</p>
                </div>
            </div>
        </AboutStyles>
    );
}

export default About;
