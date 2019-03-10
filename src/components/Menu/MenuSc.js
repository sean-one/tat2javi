import styled from 'styled-components'

export const MenuSc = styled.nav`
    position: absolute;
    background-color: white;
    width: 100%;
    padding: 2rem 0;
`;

export const Links = styled.div`
    padding-top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span.links {
        font-size: 1.8rem;
        font-weight: 500;
        text-transform: uppercase;
        padding: 1rem 0;
        border-bottom: 0.1rem solid lightgrey;
        width: 60%;

        a {
            text-decoration: none;
            color: inherit;
        }
    }
`;
