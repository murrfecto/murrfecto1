import { useState } from "react";
import { Link } from "react-router-dom";
import "./MobileMenu.scss";
import { useMediaQuery } from "@mui/material";
import { ReactComponent as BurgerIcon } from "../../../assets/header/burger.svg";
import { ReactComponent as CrossIcon } from "../../../assets/header/close.svg";
import logo from "../../../assets/header/logo.svg";
import Infobox from "../Infobox/Infobox";
import ModalButton from "../../ModalButton/ModalButton";

const MobileMenu = () => {
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width:1439.9px)");
  const [menu, setMenu] = useState(false);

  let width = 87;
  let height = 36;

  if (isTablet) {
    width = 144;
    height = 60;
  }

  const toggleModal = () => {
    setMenu(!menu);
  };

  return (
    <div className="mobile_menu container">
      <div className="mobile_menu-wrapper">
        <Link to="/">
          <img src={logo} alt="murfecto logo" width={width} height={height} />
        </Link>
        {isTablet && <ModalButton title={"Нагодуй кота"} />}
        {!menu ? (
          <button
            id={"data-mobile"}
            className="mobile_menu-btn"
            type="button"
            onClick={() => toggleModal()}
          >
            <BurgerIcon width={32} height={32} />
          </button>
        ) : (
          <button
            id={"data-mobile"}
            className="mobile_menu-btn"
            type="button"
            onClick={toggleModal}
          >
            <CrossIcon width={32} height={32} />
          </button>
        )}
      </div>

      {menu && (
        <div className={`mobile_navbar ${menu ? "active" : ""}`}>
          <nav className={"mobile_nav "} onClick={toggleModal}>
            <ul className={"mobile_nav-list"}>
              <li>
                {" "}
                <Link to={"/about"}>Про притулок</Link>
              </li>
              <li>
                <Link to={"/tails"}>Наші хвости</Link>
              </li>
              <li>
                <Link to={"/contacts"}>Контакти</Link>
              </li>
            </ul>
          </nav>
          <Infobox />
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
