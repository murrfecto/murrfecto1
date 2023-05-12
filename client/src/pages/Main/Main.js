import React from "react";
import ImageContainer from "../../components/ImageContainer/ImageContainer";
import "./Main.scss";
import AboutUs from "../../components/AboutUs/AboutUs";
import SupportUs from "../../components/SupportUs/SupportUs";
import OurCats from "../../components/OurCats/OurCats";
import SubscribeForm from "../../components/SubscribeForm/SubscribeForm";


const Main = () => {
  return (
    <>
      <ImageContainer />
      <AboutUs />
      <SupportUs />
      <OurCats />
      <SubscribeForm />
    </>
  );
};

export default Main;
