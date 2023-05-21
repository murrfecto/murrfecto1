import React from "react";
import "./Navbar.scss";
import logo from "../../assets/logo.svg";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={'navbar'}>
            <div className={"navbar_logo"}>
                <Link to={'/'}>
                    <img src={logo} alt="murfecto logo"/>
                </Link>

            </div>
            <div className={"navbar_wrapper"}>
                <div className={"navbar_links links"}>

                    <a href={"#"}>Про притулок</a>
                    <Link to={'/tails'}>Наші хвости</Link>
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
