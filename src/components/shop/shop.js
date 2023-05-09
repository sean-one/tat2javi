import React from 'react';
import styled from 'styled-components';

import { ShopItems } from './shopItemsList';
import ShopItemCard from './shopItemCard';

// styling
const ShopStyles = styled.div`
    .shopWrapper {
        width: 100%;
        padding: 1rem 0 2rem;
        border: 1px solid red;
        /* display: flex; */
        /* flex-direction: column; */
    }

    .shopItemList {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    }
`;


const Shop = (props) => {
    return (
        <ShopStyles>
            <div className='shopWrapper'>
                <div className='shopItemList'>
                    {
                        ShopItems.map(item => (
                            <ShopItemCard item={item} />
                        ))
                    }
                </div>
            </div>
        </ShopStyles>
    );
}

export default Shop;
