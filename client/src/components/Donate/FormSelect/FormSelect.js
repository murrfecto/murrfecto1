import { useEffect, useState } from "react";
import "./FormSelect.scss";
import Select from "react-select";

const FormSelect = ({
  selectedCat,
  setSelectedCat,
  menuPortalTarget = null,
}) => {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await fetch("https://murrfecto.foradmin.fun/api/v1/cats");
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
      marginTop: "0",
      zIndex: "9999",
      borderColor: "#AEAEAE",
      borderRadius: "9px",
    }),

    menuList: () => ({
      overflow: "hidden",
      zIndex: "9999",
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
        isLoading={isLoading}
        styles={styledSelect}
        value={selectedCat}
        onChange={(option) => setSelectedCat(option)}
        getOptionValue={(option) => option.label}
        menuPortalTarget={menuPortalTarget}
        menuPlacement="auto"
      />
    </div>
  );
};

export default FormSelect;
