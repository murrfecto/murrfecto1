import React from "react";
import "./AccordionSlider.scss";
import { useState } from "react";
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
  // const [isActive, setIsActive] = useState(0);

  const [sliders, setSliders] = useState(defaultSliders);

  // const toggleActive = (i) => setIsActive(i);
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
        {activeSlider().id === "foodTreatsToys" ? (
          <div className={"support"}>
            <h3 className={"support_title-h3"}>
              Існує багато способів допомоги - оберіть свій
            </h3>
            <p className={"support_description"}>
              Допомога вуличним котам не обмежується лише фінансами. Постійно
              потребуємо кормів, медикаментів, розповсюдження інформації тощо.
            </p>
            <div className={"support_post"}>
              <h4 className={"support_title-h4"}>
                Наше відділення НП для посилок
              </h4>
              <p className={"support_post-text"}>
                №225 м.Київ пр.С.Бандери +38 063 6286630
              </p>
            </div>
          </div>
        ) : (
          <div className={"donate-slider_wrap"}>
            <h3 className={"donate-slider_title"}>
              Ваша підтримка змінить життя одного кота!
            </h3>
            <form className={"donate-form"}>
              <div className={"donate-form_box"}>
                <div className={"donate-form_box-count"}>
                  <input
                    type="radio"
                    name="donation_number"
                    id="twenty"
                    value="20"
                    hidden
                  />
                  <label for="twenty" className={"donate-form_radio-label"}>
                    <span className={"donate-form_number"}>20</span>
                  </label>
                </div>
                <div className={"donate-form_box-count"}>
                  <input
                    type="radio"
                    name="donation_number"
                    id="fifty"
                    value="50"
                    hidden
                  />
                  <label for="fifty" className={"donate-form_radio-label"}>
                    <span className={"donate-form_number"}>50</span>
                  </label>
                </div>
                <div className={"donate-form_box-count"}>
                  <input
                    type="radio"
                    name="donation_number"
                    id="hundred"
                    value="100"
                    hidden
                  />
                  <label for="hundred" className={"donate-form_radio-label"}>
                    <span className={"donate-form_number"}>100</span>
                  </label>
                </div>
                <div className={"donate-form_box-count"}>
                  <input
                    type="radio"
                    name="donation_number"
                    id="two_hundred"
                    value="200"
                    hidden
                  />
                  <label
                    for="two_hundred"
                    className={"donate-form_radio-label"}
                  >
                    <span className={"donate-form_number"}>200</span>
                  </label>
                </div>
                <div className={"donate-form_input-count"}>
                  <input
                    className={"donate-form_input-free"}
                    type="number"
                    name="donation_free"
                    placeholder="Інша сума, UAH"
                  />
                </div>
              </div>
              <div className={"donate-form_select"}>
                <label for="cats" className={"donate-form_select-label"}>
                  Допомогти конкретному котику
                </label>
                <div className={"donate-form_select-box"}>
                  <select name="cat" id="cats">
                    <option value="0" selected hidden>
                      Оберіть пухнастика
                    </option>
                    <option value="1">Черчіль</option>
                    <option value="2">Зоя</option>
                    <option value="3">Костик</option>
                  </select>
                </div>
              </div>
              <div>
                <input
                  className={"donate-form_btn"}
                  type="button"
                  value="Допомогти"
                />
              </div>
            </form>
          </div>
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
