import React from 'react';
import styled from 'styled-components';

const ShopItemCardStyles = styled.div`
    .shopItemCardWrapper {
        height: 30rem;
        width: 55rem;
        background-color: #8F8D84;
    }
`;


const ShopItemCard = (props) => {
    return (
        <ShopItemCardStyles>
            <div className='shopItemCardWrapper'></div>
        </ShopItemCardStyles>
    )
}

export default ShopItemCard;