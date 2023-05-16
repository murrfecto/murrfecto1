import React from "react";
import ImageContainer from "../../components/ImageContainer/ImageContainer";
import AboutUs from "../../components/AboutUs/AboutUs";
import SupportUs from "../../components/SupportUs/SupportUs";
import OurCats from "../../components/OurCats/OurCats";
import SubscribeForm from "../../components/SubscribeForm/SubscribeForm";
import AccordionSlider from '../../components/AccordionSlider/AccordionSlider';
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";

const Main = () => {
    return (
        <>
            <ImageContainer/>
            <AboutUs/>
            <SupportUs/>
            <OurCats/>
            <SubscribeForm/>
            <AccordionSlider/>
            <ScrollToTop/>
        </>
    );
};

export default Main;
