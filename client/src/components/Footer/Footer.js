import { Link } from "react-router-dom";
import "./Footer.scss";
import "../Header/Navbar/Navbar.scss";

import logo from "../../assets/footer/logo.svg";
import email from "../../assets/footer/envelope.svg";
import phone from "../../assets/footer/phone.svg";
import facebook from "../../assets/footer/facebook.svg";
import insta from "../../assets/footer/insta.svg";
import { scrollToTop } from "../../helpers/scrollToTop";
import ModalButton from "../ModalButton/ModalButton";

import PrivacyPolicyPdf from "../../assets/dataDocs/privacy-policy.pdf";

const Footer = () => {
  return (
    <footer className={"footer"}>
      <div className="footer_container container">
        <div className={"footer_info_wrapper"}>
          <div className="wrapper">
            <Link to={"/"} className={"footer_logo-link"} onClick={scrollToTop}>
              <img
                className={"footer_logo-img"}
                src={logo}
                alt="murrfecto logo"
                width={170}
                height={70}
              />
            </Link>

            <ModalButton title={"Нагодуй кота"} style={"footer_donation"} />
          </div>

          <nav className={"footer_nav"}>
            <Link className={"footer_link"} to={"/about"} onClick={scrollToTop}>
              Про притулок
            </Link>
            <Link to="/tails" className={"footer_link"} onClick={scrollToTop}>
              Наші хвости
            </Link>
          </nav>

          <address className="footer_address">
            <h2 className="contacts_title">Контакти</h2>
            <ul className="contacts_list">
              <li>
                <p className="info_link contacts_link">
                  <img
                    className={"contacts_icon"}
                    src={phone}
                    alt="phone icon"
                  />
                  <span>+38 063 628 6630</span>
                </p>
              </li>
              <li>
                <p className={"info_link  contacts_link"}>
                  <img
                    className={"contacts_icon"}
                    src={phone}
                    alt="phone icon"
                  />
                  <span>+38 067 568 1788</span>
                </p>
              </li>
              <li>
                <p className={"info_link contacts_link"}>
                  <img
                    className={"contacts_icon"}
                    src={email}
                    alt="email icon"
                  />
                  info@murrfecto.site
                </p>
              </li>
            </ul>
          </address>

          <div className={"footer_documents-wrapper"}>
            <a
              className={"footer_link"}
              href="#"
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              Правила користування сайтом
            </a>
            <a
              className={"footer_link"}
              href={PrivacyPolicyPdf + "#toolbar=0"}
              target="_blank"
              aria-readonly
              rel="nofollow noreferrer noopener"
            >
              Політика конфіденційності
            </a>
          </div>
          <ul className={"social_list"}>
            <li className={"social_item"}>
              <a
                className={"social_link"}
                href="https://www.instagram.com/murrfecto_murr/"
                target="_blank"
                rel="nofollow noreferrer noopener"
              >
                <img src={insta} alt="instagramm" width={48} height={48} />
              </a>
            </li>
            <li className={"social_item"}>
              <a
                className={"social_link"}
                href="https://www.facebook.com/profile.php?id=100092408450281"
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
          </ul>
        </div>
        <p className="footer_copyrights">
          Розробка Baza Trainee Ukraine 2023 Всі права захищені.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
