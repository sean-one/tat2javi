import React from 'react';
import styled from 'styled-components';

const ShopItemCardStyles = styled.div`
    .shopItemCardWrapper {
        width: 100%;
        max-width: 275px;
        border-radius: 5px;
        background-color: rgba(143,141,132,0.4);
        padding: 1rem 1rem 2rem;
        /* background-color: #8F8D84; */
        
        @media only screen and (max-width: 850px) {
            max-width: 500px;
        }
    }

    .shopItemDetails {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .shopItemImage {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 275px;

        img {
            width: 100%;
            display: block;
            border-radius: 5px;
        }

        @media only screen and (max-width: 850px) {
            max-width: 500px;
        }
    }

    .shopItemName, .shopItemDescription {
        width: 100%;
        align-self: flex-start;
    }

    .shopItemName {
        color: #0E1111;
        font-size: 1.8rem;
        font-weight: bold;
        border-radius: 5px;
        border-bottom: 1px solid #0E1111;
    }
    
    .shopItemPrice {
        width: 100%;
        font-size: 2rem;
        text-align: right;
        margin-top: 1rem;
    }
    
`;


const ShopItemCard = ({ item }) => {

    return (
        <ShopItemCardStyles>
            <div className='shopItemCardWrapper'>
                <div className='shopItemDetails'>
                    <div className='shopItemImage'>
                        <img src={item.itemimage} alt='tat2javi product' />
                    </div>
                    <div className='shopItemPrice'>{item.itemprice}</div>
                    <div className='shopItemName'>{item.itemname}</div>
                    <div className='shopItemDescription'>{item.itemdescription}</div>
                </div>
            </div>
        </ShopItemCardStyles>
    )
}

export default ShopItemCard;