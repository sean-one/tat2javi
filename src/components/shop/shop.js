import React from 'react';
import styled from 'styled-components';

import ShopItemCard from './shopItemCard';

// styling
import './shop.css'
const ShopStyles = styled.div`

`;

const Shop = (props) => {
    return (
        <ShopStyles>
            <div>
                <h1>Tat2Javi Merch</h1>
                <ShopItemCard />
            </div>
        </ShopStyles>
    );
}

export default Shop;
