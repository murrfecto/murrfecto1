import { useEffect, useState } from "react";
import "./FormSelect.scss";
import Select from "react-select";
import { _ENDPOINT } from "../../../variables/variables";

const FormSelect = ({ selectedCat, setSelectedCat, menuPortalTarget }) => {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await fetch(`${_ENDPOINT}/cats`);
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

  const customMenuStyles = {
    overflowY: "auto",
    position: "absolute",
    zIndex: "9999",
    backgroundColor: "#FCFCFF",
    borderColor: "#AEAEAE",
  };

  const styledSelect = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      fontSize: "20px",
      fontWeight: "400",
      fontFamily: "Nunito Sans, serif",
      color: "#4F5A69",
      marginBottom: "20px",
      height: "50px",
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
      padding: "0 12px",
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
      ...customMenuStyles,
      marginTop: "0",
      zIndex: "9999",
      borderColor: "#AEAEAE",
      borderRadius: "9px",
    }),

    menuList: (baseStyles) => ({
      ...baseStyles,
      zIndex: "9999",
      borderRadius: "9px",
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

    loadingMessage: (baseStyles) => ({
      ...baseStyles,
      fontSize: "20px",
      fontWeight: "400",
      fontFamily: "Nunito Sans, serif",
      color: "#AEAEAE",
    }),

    menuPortal: (baseStyles) => ({ ...baseStyles, zIndex: 9999 }),
  };

  return (
    <div className={"form-select"}>
      <label htmlFor="cats" className={"form-select_label"}>
        Допомогти конкретному котику
      </label>
      <Select
        placeholder="Оберіть пухнастика"
        options={cats}
        isSearchable={false}
        maxMenuHeight={200}
        isLoading={isLoading}
        styles={styledSelect}
        value={selectedCat}
        onChange={(option) => setSelectedCat(option)}
        getOptionValue={(option) => option.label}
        menuShouldScrollIntoView={true}
        menuPlacement="auto"
        menuPortalTarget={menuPortalTarget}
      />
    </div>
  );
};

export default FormSelect;
