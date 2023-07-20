import React from 'react';
import './SupportCard.scss'
import {useDispatch} from "react-redux";
import {openModal} from "../../../../store/modalSlice";
import {useNavigate} from "react-router-dom";
const SupportCard = ({src, alt, header, text,onCardClick}) => {
    const handleClickProps = () => {
        onCardClick(); // Виклик функції, переданої через пропс onCardClick
    };
    return (
        <div className={'support_card'} onClick={handleClickProps}>
            <img className={'support_card-icon'} src={src} alt={alt}/>
            <div className={'support_card-wrapper'}>
                <h3  className={'support_card-header'}>{header}</h3>
                <p  className={'support_card-text'}>{text}</p>
            </div>
        </div>
    );
};

export default SupportCard;
