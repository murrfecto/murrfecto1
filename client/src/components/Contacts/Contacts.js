import React from "react";
import "./Contacts.scss";
import email from "../../assets/header/email.svg";
import phone from "../../assets/header/phone.svg";
import {ReactComponent as Insta}  from "../../assets/header/insta.svg";
import {ReactComponent as Facebook} from "../../assets/header/facebook.svg";
import FeedbackForm from "../FeedbackForm/FeedbackForm";

const Contacts = () => {
  return (
    <div className="contacts_container">
      <div className="contacts_wrapper">
        <div className="contacts_info">
          <div className="contacts_info_wrapper">
            <img
              className="contacts_info_icon"
              src={email}
              alt="email icon"
              width={24}
              height={24}
            />
            <p>info@murrfecto.site</p>
          </div>
          <div className="contacts_info_wrapper">
            <img
              className="contacts_info_icon"
              src={phone}
              alt="phone icon"
              width={24}
              height={24}
            />
            <p>+38 063 628 6630</p>
          </div>
          <div className="contacts_social">
            <a
              className="contacts_social_link"
              href="https://www.instagram.com/murrfecto_murr/"
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              <Insta
                className="contacts_social_icon"
              />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100092408450281"
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              <Facebook
                className="contacts_social_icon"
              />
            </a>
          </div>
        </div>
        <div className="contacts_np">
          <p className="contacts_np_title">Наше відділення НП для посилок</p>
          <p className="contacts_np_text">
            №225 м.Київ пр.С.Бандери
            <br /> +38 063 628 6630
          </p>
        </div>
        <div className="contacts_registration">
          <p className="contacts_registration_title">Реєстраційні дані ГО</p>
          <p className="contacts_registration_text">
          ГО "Бі Ай Ті", код ЄДРПОУ
            <br />44993792, м.Київ,
            <br /> вул.Петропавлівська, 15
          </p>
        </div>
      </div>
      <FeedbackForm />
    </div>
  );
};

export default Contacts;
