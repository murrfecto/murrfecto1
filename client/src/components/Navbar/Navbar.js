import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  return (
    <nav className={"navbar"}>
      <div className={"navbar_logo"}>
        <img src={logo} alt="murfecto logo" />
      </div>
      <div className={"navbar_wrapper"}>
        <div className={"navbar_links links"}>
          <Link to={"/about"}>Про притулок</Link>
          <Link to={"/tails"}>Наші хвости</Link>
          <a href={"#"}>Контакти</a>
        </div>
        <div id={"donation"} className={"navbar_links donation"}>
          <a href={"#"}>Нагодуй кота</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
