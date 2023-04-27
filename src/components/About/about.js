import React from 'react';
import styled from 'styled-components';

// styling
const AboutStyles = styled.div`
    .mainAboutSection {
        font-size: var(--primary-text);
        text-align: justify;
        letter-spacing: 0.2px;
        line-height: 2;
        padding: var(--main-padding) 2rem 0;

        @media only screen and (max-width: 850px) {
            line-height: 1.35;
            padding: 0 0.75rem;
        }
    }
`;


const About = (props) => {
    return (
        <AboutStyles>
            <div className='pageTitle'>
                <h1>About</h1>
            </div>
            <div className='mainAboutSection'>
                <p>Get to know 'Tat2Javi' - the talented self-taught tattoo artist from Riverside, California. With a passion for sketching and drawing that started at a young age, he found inspiration in the Chicano lifestyle and the featured artwork in Teen Angel Magazines. Tattooing with a "prison rig" at 16, he worked tirelessly to improve his craft while juggling odd jobs to make ends meet. Today, he travels the world attending tattoo conventions, seeking inspiration from other artists and challenging himself artistically. With years of experience under his belt, Tat2Javi is dedicated to his craft and ready to bring your tattoo ideas to life.</p>
            </div>
        </AboutStyles>
    );
}

export default About;
