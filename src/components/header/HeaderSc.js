import styled from 'styled-components'

const HeaderSc = styled.div`
    position: fixed;
    top: 0;
    width: 100vw;
    height: 6.5rem;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 2rem;
    border-bottom: 0.01rem rgb(255, 255, 255) solid;
    background-color: darkgray;

    div.branding img {
        max-height: 100%;
    }
`;

export default HeaderSc;