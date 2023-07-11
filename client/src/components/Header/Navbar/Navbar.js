import React from "react";
import {Link, useMatch} from "react-router-dom";
import "./Navbar.scss";
import logo from "../../../assets/header/logo.svg";
import ModalButton from "../../ModalButton/ModalButton";


function CustomLinks({to,children}) {
    let match=useMatch(to)
    return (
        <Link to={to} className={match ? 'active_link':''}>
            {children}
        </Link>
    )

}

const Navbar = () => {
  return (
    <nav className={"navbar"}>
      <div className="navbar_logo">
        <Link to="/">
          <img src={logo} alt="murfecto logo" />
        </Link>
      </div>
      <div className={"navbar_wrapper"}>
        <div className={"navbar_links"}>
          <CustomLinks to={"/about"}>Про притулок</CustomLinks>
          <CustomLinks to={"/tails"}>Наші хвости</CustomLinks>
          <CustomLinks to={"/contacts"}>Контакти</CustomLinks>
        </div>
        <ModalButton title={"Нагодуй кота"} style={'footer_donation'} />
      </div>
    </nav>
  );
};

export default Navbar;
