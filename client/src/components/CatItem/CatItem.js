import React from 'react';
import './CatItem.scss'
import paw from '../../assets/paw.svg';
import info from '../../assets/info-rounded.svg'
import {Skeleton} from "@mui/material";

const CatItem = ({src, alt, name, description, chippedInfo, _id, trash}) => {

    return (
        <li className={'cat_card'} key={_id}>
            {(src === undefined) ?
                <Skeleton variant="rect" style={{borderRadius: '20px'}} width={305} height={295}/> : (
                    <img
                        className={'cat_card-icon'}
                        src={src}
                        alt={alt}
                    />
                )}
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
                <div className="cat_card-trash">{trash}</div>
            </div>
        </li>
    );
};

export default CatItem;