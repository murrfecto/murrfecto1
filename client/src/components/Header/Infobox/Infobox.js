import React from "react";
import "./Infobox.scss";
import {ReactComponent as Insta} from "../../../assets/header/insta.svg";
import {ReactComponent as Facebook} from "../../../assets/header/facebook.svg";
import email from "../../../assets/header/email.svg";
import phone from "../../../assets/header/phone.svg";

const Infobox = () => {
  return (
    <div className="header_infobox container">
      <ul className={"social_networks "}>
        <li>
          <a
            href="https://www.instagram.com/murrfecto_murr/"
            target="_blank"
            rel="nofollow noreferrer noopener"
          >
            <Insta className="social_networks_icon"/>
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/profile.php?id=100092408450281"
            target="_blank"
            rel="nofollow noreferrer noopener"
          >
            <Facebook className="social_networks_icon"/>
          </a>
        </li>
      </ul>

      <ul className={"socials_contacts"}>
        <li className={"socials_contacts-item"}>
          <p className={"socials_contacts-link"}>
            <img src={email} alt="email-icon" />
            <p>info@murrfecto.site</p>
          </p>
        </li>
        <li className={"socials_contacts-item"}>
          <p className={"socials_contacts-link"}>
            <img src={phone} alt="phone-icon" />
            <p>+38 063 628 6630</p>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Infobox;
