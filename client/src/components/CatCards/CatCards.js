import React, { useState } from "react";
import { Skeleton } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import "./CatCards.scss";
import paw from "../../assets/paw.svg";
import info from "../../assets/info-rounded.svg";

const CatCards = ({ src, alt, name, description, chippedInfo, trash }) => {
  const [loading, setLoading] = useState(true);
  console.log(src);
  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className={"cat_card"}>
      {loading ? (
        <Skeleton
          variant="rect"
          style={{ borderRadius: "20px" }}
          width={305}
          height={295}
        />
      ) : (
        <img
          className={"cat_card-icon"}
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
        />
      )}
      <div className={"cat_card-wrapper"}>
        <div className={"cat_card-name"}>
          <p>{name}</p>
        </div>
        <div className={"cat_card-description"}>
          <img src={paw} alt="paw" />
          <p>{description}</p>
        </div>
        <div className={"cat_card-chipped"}>
          <img src={info} alt="info" />
          <p>{chippedInfo}</p>
          {trash}
        </div>
      </div>
    </div>
  );
};

export default CatCards;
