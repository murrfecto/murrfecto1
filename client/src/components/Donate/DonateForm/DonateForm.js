import { useEffect, useState } from "react";
import "./DonateForm.scss";
import Select from "react-select";

const DonateForm = ({ title }) => {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await fetch("http://localhost:3000/cats");
        const json = await data.json();
        const catOptions = json.map((elem) => {
          return {
            value: elem.id,
            label: elem.name,
          };
        });
        setCats(catOptions);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const styledSelect = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      fontSize: "20px",
      fontWeight: "400",
      fontFamily: "Nunito Sans, serif",
      color: "#4F5A69",
      marginBottom: "20px",
      cursor: "pointer",
      backgroundColor: "#FCFCFF",
      boxShadow: "none",
      borderRadius: "8px",
      borderColor: state.isFocused ? "#4B3542" : "#AEAEAE",
      "&:hover": {
        backgroundColor: "#F2F2F2",
      },
    }),

    valueContainer: (baseStyles) => ({
      ...baseStyles,
      padding: "10px 12px",
    }),

    placeholder: (baseStyles) => ({
      ...baseStyles,
      fontSize: "20px",
      fontWeight: "400",
      fontFamily: "Nunito Sans, serif",
      color: "#AEAEAE",
    }),

    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      display: "none",
    }),

    menu: (baseStyles) => ({
      ...baseStyles,
      marginTop: "0",
      borderColor: "#AEAEAE",
      borderRadius: "9px",
    }),

    menuList: () => ({
      overflow: "hidden",
      borderRadius: "9px",
      backgroundColor: "#FCFCFF",
    }),

    option: (baseStyles, state) => ({
      ...baseStyles,
      fontSize: "20px",
      fontWeight: "400",
      fontFamily: "Nunito Sans, serif",
      color: "#4F5A69",
      cursor: "pointer",
      backgroundColor: state.isSelected ? "#D0BEC4" : "#FCFCFF",
      "&:hover": {
        backgroundColor: "#F2F2F2",
      },
    }),

    dropdownIndicator: (baseStyles, state) => ({
      ...baseStyles,
      transition: "all .3s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    }),
  };

  return (
    <div className={"donate-slider_wrap"}>
      <h3 className={"donate-slider_title"}>{title}</h3>
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
            <label htmlFor="twenty" className={"donate-form_radio-label"}>
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
            <label htmlFor="fifty" className={"donate-form_radio-label"}>
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
            <label htmlFor="hundred" className={"donate-form_radio-label"}>
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
            <label htmlFor="two_hundred" className={"donate-form_radio-label"}>
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
          <label htmlFor="cats" className={"donate-form_select-label"}>
            Допомогти конкретному котику
          </label>
          <Select
            placeholder="Оберіть пухнастика"
            options={cats}
            isLoading={isLoading}
            styles={styledSelect}
            value={selectedCat}
            onChange={(option) => setSelectedCat(option)}
            getOptionValue={(option) => option.label}
          />
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
  );
};

export default DonateForm;
