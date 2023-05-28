import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../../assets/header/logo.svg";
import ModalButton from "../../ModalButton/ModalButton";

const Navbar = () => {
  return (
    <nav className={"navbar"}>
      <div className="navbar_logo">
        <Link to="/">
          <img src={logo} alt="murfecto logo" />
        </Link>
      </div>
      <div className={"navbar_wrapper"}>
        <div className={"navbar_links links"}>
          <Link to={"/about"}>Про притулок</Link>
          <Link to={"/tails"}>Наші хвости</Link>
          <Link to={"/contacts"}>Контакти</Link>
        </div>
        <ModalButton title={"Нагодуй кота"} />
      </div>
    </nav>
  );
};

export default Navbar;
