import React from "react";
import "./Footer.scss";
import "../Navbar/Navbar.scss";

import logo from "../../assets/footer/logo.png";
import email from "../../assets/footer/envelope.svg";
import phone from "../../assets/footer/phone.svg";
import facebook from "../../assets/footer/facebook.svg";
import linkedin from "../../assets/footer/linkedin.svg";

const Footer = () => {
  return (
    <footer className={"footer"}>
      <div className="footer_container">
        <div className={"footer_info_wrapper"}>
          <div>
            <a href={"#"}>
              <img src={logo} alt="murfecto logo" className={"footer_logo"} />
            </a>

            <a id={"donation_footer"} className={"footer_donation"} href={"#"}>
              Нагодуй кота
            </a>
          </div>

          <address className="footer_address">
            <h2 className={"column_title"}>Контакти</h2>
            <ul>
              <li>
                <a className={"info_link"} href="mailto:info@example.com">
                  <img
                    className={"contacts_icon"}
                    src={email}
                    alt="email icon"
                  />
                  <span>xxxxxxxxx@gmail.com</span>
                </a>
              </li>
              <li>
                <a className={"info_link"} href="tel:+38 (093) 280 76 19">
                  <img
                    className={"contacts_icon"}
                    src={phone}
                    alt="phone icon"
                  />
                  <span>+38 (093) 280 76 19</span>
                </a>
              </li>
            </ul>
          </address>

          <nav className={"footer_nav"}>
            <h2 className={"column_title"}>Meню</h2>
            <a className={"info_link"} href={"#"}>
              Про притулок
            </a>
            <a className={"info_link"} href={"#"}>
              Наші хвости
            </a>
            <a className={"info_link"} href={"#"}>
              Життя притулку
            </a>
          </nav>

          <div className={"footer_documents-wrapper"}>
            <h2 className={"column_title"}>Загальна інформація</h2>
            <a className={"info_link"} href="#" target="_blank">
              Політика конфіденційності
            </a>
            <a
              className={"info_link"}
              href="#"
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              Договір оферти
            </a>
          </div>
          <ul className={"social_list"}>
            <li className={"social_link"}>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="nofollow noreferrer noopener"
              >
                <img
                  src={facebook}
                  alt="facebook icon"
                  width={48}
                  height={48}
                />
              </a>
            </li>
            <li className={"social_link"}>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="nofollow noreferrer noopener"
              >
                <img
                  src={linkedin}
                  alt="lincedin icon"
                  width={48}
                  height={48}
                />
              </a>
            </li>
          </ul>
        </div>
        <p className="footer_copyrights">
          Розробка BazaTraineeUkraine 2023 &#169; Усі права захищено.{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
