import React from 'react';
import './SupportCard.scss'
import {useDispatch} from "react-redux";
import {openModal} from "../../../../store/modalSlice";
const SupportCard = ({src, alt, header, text}) => {
    const dispatch = useDispatch();
    const handleOpenModal = () => {
        dispatch(openModal()); // Виклик диспетчера для відкриття модального вікна
    };
    return (
        <div className={'support_card'} onClick={handleOpenModal}>
            <img className={'support_card-icon'} src={src} alt={alt}/>
            <div className={'support_card-wrapper'}>
                <h3  className={'support_card-header'}>{header}</h3>
                <p  className={'support_card-text'}>{text}</p>
            </div>
        </div>
    );
};

export default SupportCard;
