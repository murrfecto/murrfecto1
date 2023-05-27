import React from "react";
import "./Infobox.scss";
import insta from "../../../assets/header/insta.svg";
import facebook from "../../../assets/header/facebook.svg";
import email from "../../../assets/header/email.svg";
import phone from "../../../assets/header/phone.svg";

const Infobox = () => {
  return (
    <div className="header_infobox container">
      <ul className={"social_networks "}>
        <li>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="nofollow noreferrer noopener"
          >
            <img src={insta} alt="insta-icon" />
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/profile.php?id=100092408450281"
            target="_blank"
            rel="nofollow noreferrer noopener"
          >
            <img src={facebook} alt="facebook-icon" />
          </a>
        </li>
      </ul>

      <ul className={"socials_contacts"}>
        <li className={"socials_contacts-item"}>
          <img src={email} alt="email-icon" />
          <p>info@murrfecto.site</p>
        </li>
        <li className={"socials_contacts-item"}>
          <img src={phone} alt="phone-icon" />
          <p>+38 063 628 6630</p>
        </li>
      </ul>
    </div>
  );
};

export default Infobox;
