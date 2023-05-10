import React from 'react';
import './CatCards.scss'
import paw from '../../assets/paw.svg';
import info from '../../assets/info-rounded.svg'

const CatCards = ({src, alt, name, description, chippedInfo}) => {
    return (
        <div className={'cat_card'}>
            <img className={'cat_card-icon'} src={src} alt={alt}/>
            <div className={'cat_card-wrapper'}>
                <div className={'cat_card-name'}>
                    <p>{name}</p>
                </div>
                <div className={'cat_card-description'}>
                    <img src={paw} alt="paw"/>
                    <p>{description}</p>
                </div>
                <div className={'cat_card-chipped'}>
                    <img src={info} alt="info"/>
                    <p>{chippedInfo}</p>
                </div>
            </div>
        </div>
    );
};

export default CatCards;