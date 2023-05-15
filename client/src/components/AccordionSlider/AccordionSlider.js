import React from "react";
import "./AccordionSlider.scss";
import { useState } from "react";
import catWithPlate from "../../assets/cat_with_plate.svg";
import foodForCats from "../../assets/food_for_cats.svg";
import foodTreatsToys from "../../assets/food_treats_toys.svg";

const sliders = [
  {
    img: catWithPlate,
    text: "Одноразово",
    index: 3,
  },

  {
    img: foodForCats,
    text: "Щомісячно",
    index: 2,
  },

  {
    img: foodTreatsToys,
    text: "Кормом, ліками, іграшками",
    index: 1,
  },
];

const AccordionSlider = () => {
  const [isActive, setIsActive] = useState(0);

  const toggleActive = (i) => setIsActive(i);

  return (
    <div className={"accordion-slider"}>
      <div className={"accordion-slider_flex"}>
        {sliders.map((slider, i) => {
          return (
            <div
              key={i}
              className={`accordion-slider_item ${
                isActive === i ? "active" : ""
              }`}
              style={{ zIndex: slider.index }}
              onClick={() => toggleActive(i)}
            >
              <img className={"accordion-slider_item-img"} src={slider.img} />
              <p className={"accordion-slider_item-text"}>{slider.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccordionSlider;
