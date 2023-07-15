import React from "react";
import ImageContainer from "./components/ImageContainer/ImageContainer";
import AboutUs from "./components/AboutUs/AboutUs";
import SupportUs from "./components/SupportUs/SupportUs";
import OurCats from "./components/OurCats/OurCats";
import SubscribeForm from "./components/SubscribeForm/SubscribeForm";
import Donate from "../../components/Donate/Donate";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";
import {motion} from "framer-motion";
const Main = () => {
    const container = {
        hidden :{opacity:1, scale:0.95},
        visible: {
            opacity: 1,
            scale: 1,
            transition:{
                delayChildren:0.2,
                staggerChildren:0.1
            }
        }
    }


    return (
        <motion.div
            variants={container}
            initial='hidden'
            animate='visible'>
            <ImageContainer/>
            <AboutUs/>
            <SupportUs/>
            <OurCats/>
            <Donate/>
            <SubscribeForm/>
            <ScrollToTop/>
        </motion.div>
    );
};

export default Main;
