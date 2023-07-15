import React, {useState} from "react";
import "./OurCats.scss";
import {Link} from "react-router-dom";
import OtherCatsSlider from "../../../../components/OtherCatsSlider/OtherCatsSlider";

const OurCats = () => {
    return (
        <article id="our_cats">
            <h2>Наші хвости</h2>
            <div className={'cats_cards-other'}>
                <OtherCatsSlider/>
            </div>
            <Link to="/tails" className={"cats_cards-link"}>
                Переглянути усіх
            </Link>
        </article>
    );
};

export default OurCats;
