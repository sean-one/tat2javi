import React from 'react';
import styled from 'styled-components';

import merch_coming_soon from '../../images/merch_coming_soon.png';

// import { ShopItems } from './shopItemsList';
// import ShopItemCard from './shopItemCard';

// styling
const ShopStyles = styled.div`
    .shopWrapper {
        width: 100%;
        padding: 1rem 0.5rem 2rem;
        /* padding: 1rem 0 2rem; */
    }

    /* .shopItemList {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    } */

    .comingSoonWrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        
        @media only screen and (max-width: 850px) {
            flex-direction: column-reverse;
            align-items: center;
        }
    }

    .comingSoonImage {
        width: 100%;
        max-width: 400px;

        img {
            width: 100%;
            display: block;
        }
    }

    .comingSoonText {
        align-self: center;
        width: 100%;
        text-align: center;
        font-size: 2.4rem;
        font-weight: bold;
        color: #E7EBE8;
        padding: 1rem 0;
    }
`;


const Shop = (props) => {
    return (
        <ShopStyles>
            <div className='shopWrapper'>
                <div className='comingSoonWrapper'>
                    <div className='comingSoonImage'>
                        <img src={merch_coming_soon} alt='tat2javi merch coming soon' />
                    </div>
                    <div className='comingSoonText'>
                        <div>COMING SOON</div>
                    </div>
                </div>
                {/* <div className='shopItemList'>
                    {
                        ShopItems.map(item => (
                            <ShopItemCard item={item} />
                        ))
                    }
                </div> */}
            </div>
        </ShopStyles>
    );
}

export default Shop;
