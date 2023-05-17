import React from "react";
import Title from "../../components/Title/Title";
import CatsGallery from "../../components/CatsGallery/CatsGallery";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";


export const OurTails = () => {
    return (
    <>
    <Title text="Наші хвости"/>
    <CatsGallery/>
    <ScrollToTop/>
    </>    
    );  
};
