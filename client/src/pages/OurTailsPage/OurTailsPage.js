import React from "react";
import Title from "../../components/Title/Title";
import CatsGallery from "../../components/CatsGallery/CatsGallery";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";
import './OurTailsPage.scss'
import ourTailsBanner from '../../assets/banners/ourCats.jpg'

export const OurTails = () => {
    return (
        <>
            <title>Наші коти</title>
            <Title text="Наші хвости" backgroundImage={ourTailsBanner}/>
            <div className='gallery-container'>
                <CatsGallery select displayIcon={false}/>
            </div>
            <ScrollToTop/>
        </>
    );
};
