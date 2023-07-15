import React from "react";
import { useMediaQuery } from "@mui/material";

import "../../../../global.scss";
import "./ImageContainer.scss";
import ModalButton from "../../../../components/ModalButton/ModalButton";

const ImageContainer = () => {
  const isMobile = useMediaQuery("(max-width:767.9px)");

  return (
          <section className="hero">
              <div className="main_bg">
                  <h1>Навіщо жити без кота, якщо можна жити з котом</h1>
                  {isMobile && <ModalButton title={'Нагодуй кота'} style={'footer_donation'} />}
              </div>
          </section>
  );
};

export default ImageContainer;
