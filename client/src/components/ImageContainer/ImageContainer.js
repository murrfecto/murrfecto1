import React from "react";
import { useMediaQuery } from "@mui/material";

import "../../global.scss";
import "./ImageContainer.scss";
import ModalButton from "../ModalButton/ModalButton";

const ImageContainer = () => {
  const isMobile = useMediaQuery("(max-width:767.9px)");

  return (
    <section className="hero">
      <div className="main_bg container">
        <h1>Навіщо жити без кота, якщо можна жити з котом</h1>
        {isMobile && <ModalButton title={'Нагодуй кота'} />}
      </div>
    </section>
  );
};

export default ImageContainer;
