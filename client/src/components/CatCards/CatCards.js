import React, {useState} from 'react';
import './CatCards.scss'
import paw from '../../assets/paw.svg';
import info from '../../assets/info-rounded.svg'
import {Skeleton} from "@mui/material";
const CatCards = ({src, alt, name, description, chippedInfo}) => {
    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <div className={'cat_card'}>
            {loading ? (
                <Skeleton variant="rect" style={{borderRadius: '20px'}} width={305} height={295} />
            ) : (
                <img
                    className={'cat_card-icon'}
                    src={src}
                    alt={alt}
                    onLoad={handleImageLoad}
                />
            )}
            <div className={'cat_card-wrapper'}>
                <div className={'cat_card-name'}>
                    <p>{name}</p>
                </div>
                <div className={'cat_card-description'}>
                    <img src={paw} alt="paw" />
                    <p>{description}</p>
                </div>
                <div className={'cat_card-chipped'}>
                    <img src={info} alt="info" />
                    <p>{chippedInfo}</p>
                </div>
            </div>
        </div>
    );
};

export default CatCards;