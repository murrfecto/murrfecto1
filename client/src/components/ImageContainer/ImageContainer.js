import React from 'react';
import catBg from "../../assets/main-cat-bg.jpg";
import '../../global.css'
import './ImageContainer.scss'
const ImageContainer = () => {
    return (
            <div className={'main_bg'}>
                <img className={'main_bg-image'} src={catBg} alt="cat-backgroung"/>
                <h1>Навіщо жити без кота, якщо можна жити з котом</h1>
            </div>
    );
};

export default ImageContainer;