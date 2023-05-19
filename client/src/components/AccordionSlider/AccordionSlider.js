import React from "react";
import "./AccordionSlider.scss";
import { useState } from "react";
import DonateForm from "../Donate/DonateForm/DonateForm";
import HelpUs from "../HelpUs/HelpUs";
import catWithPlate from "../../assets/cat_with_plate.png";
import foodForCats from "../../assets/food_for_cats.png";
import foodTreatsToys from "../../assets/food_treats_toys.png";

const defaultSliders = [
  {
    id: "catWithPlate",
    img: catWithPlate,
    text: "Одноразово",
    zIndex: 3,
    isActive: true,
  },

  {
    id: "foodForCats",
    img: foodForCats,
    text: "Щомісячно",
    zIndex: 2,
    isActive: false,
  },

  {
    id: "foodTreatsToys",
    img: foodTreatsToys,
    text: "Кормом, ліками, іграшками",
    zIndex: 1,
    isActive: false,
  },
];

const AccordionSlider = () => {
  const [sliders, setSliders] = useState(defaultSliders);

  const handleActive = (clikedSlider) => {
    const newSliders = sliders.map((slider) => {
      if (slider.id === clikedSlider.id) {
        slider.isActive = true;
      } else {
        slider.isActive = false;
      }
      return slider;
    });
    setSliders(newSliders);
  };

  const activeSlider = () => {
    return sliders.find((slider) => slider.isActive);
  };

  return (
    <div className={"donate-slider"}>
      <div className={"donate-slider_left"}>
        {activeSlider().id === "catWithPlate" ? (
          <DonateForm title="Нагодуйте котів вже сьогодні - ваша допомога важлива" />
        ) : activeSlider().id === "foodForCats" ? (
          <DonateForm title="Ваша  підтримка змінить життя одного кота!" />
        ) : (
          <HelpUs />
        )}
      </div>
      <div className={"accordion-slider"}>
        <ul className={"accordion-slider_flex"}>
          {sliders.map((slider, i) => {
            return (
              <li
                key={i}
                className={`accordion-slider_item ${
                  slider.isActive ? "active" : ""
                }`}
                style={{
                  zIndex: slider.zIndex,
                  backgroundImage: `url(${slider.img})`,
                }}
                onClick={() => handleActive(slider)}
              >
                <div className={"accordion-slider_item-info"}>
                  <p className={"accordion-slider_item-text"}>{slider.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AccordionSlider;
