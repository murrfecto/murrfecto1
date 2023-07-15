import React from 'react';
import './SupportCard.scss'
const SupportCard = ({src, alt, header, text}) => {
    return (
        <div className={'support_card'}>
            <img className={'support_card-icon'} src={src} alt={alt}/>
            <div className={'support_card-wrapper'}>
                <h3  className={'support_card-header'}>{header}</h3>
                <p  className={'support_card-text'}>{text}</p>
            </div>
        </div>
    );
};

export default SupportCard;
