import React from "react";
import Infobox from "../../components/Infobox/Infobox";
import Navbar from "../../components/Navbar/Navbar";
import ImageContainer from "../../components/ImageContainer/ImageContainer";
import "./Main.scss";
import AboutUs from "../../components/AboutUs/AboutUs";
import SupportUs from "../../components/SupportUs/SupportUs";
import OurCats from "../../components/OurCats/OurCats";
import SubscribeForm from "../../components/SubscribeForm/SubscribeForm";
import Footer from "../../components/Footer/Footer";

const Main = () => {
  return (
    <>
      <Infobox />
      <Navbar />
      <ImageContainer />
      <AboutUs />
      <SupportUs />
      <OurCats />
      <SubscribeForm />
      <Footer />
    </>
  );
};

export default Main;
