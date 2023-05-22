import React from "react";
import "./OurCats.scss";
import CatsGallery from "../CatsGallery/CatsGallery";
import { Link } from "react-router-dom";

const OurCats = () => {
  return (
    <article id="our_cats">
      <h2>Наші хвости</h2>
      <CatsGallery limit={4} displayIcon={false}/>
      <Link to="/tails" className={"cats_cards-link"}>
        Переглянути усіх
      </Link>
    </article>
  );
};

export default OurCats;
