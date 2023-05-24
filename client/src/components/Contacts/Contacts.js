import React from "react";
import "./Contacts.scss";
import email from "../../assets/Email-contacts.svg";
import phone from "../../assets/phone-contacts.svg";
import insta from "../../assets/insta.svg";
import facebook from "../../assets/socials-facebook.svg";
import FeedbackForm from "../FeedbackForm/FeedbackForm";

const Contacts = () => {

    return (
        <div className="contacts_container">
            <div className="contacts_wrapper">
                <div className="contacts_info">
                    <a className="contacts_info_link" href="mailto:info@murrfecto.site">
                        <img
                            className="contacts_info_icon"
                            src={email}
                            alt="email icon"
                            width={24}
                            height={24}
                        />
                        info@murrfecto.site
                    </a>
                    <a className="contacts_info_link" href="tel:+380636286630">
                        <img
                            className="contacts_info_icon"
                            src={phone}
                            alt="phone icon"
                            width={24}
                            height={24}
                        />
                        +38 063 628 6630
                    </a>
                    <div className="contacts_social">
                        <a
                            href="https://www.instagramm.com/"
                            target="_blank"
                            rel="nofollow noreferrer noopener"
                        >
                            <img
                                className="contacts_social_icon"
                                src={insta}
                                alt="instagram icon"
                                width={32}
                                height={32}
                            />
                        </a>
                        <a
                            href="https://www.facebook.com/profile.php?id=100092408450281"
                            target="_blank"
                            rel="nofollow noreferrer noopener"
                        >
                            <img
                                className="contacts_social_icon"
                                src={facebook}
                                alt="facebook icon"
                                width={32}
                                height={32}
                            />
                        </a>
                    </div>
                </div>
                <div className="contacts_np">
                    <p className="contacts_np_title">Наше відділення НП для посилок</p>
                    <p className="contacts_np_text">
                        №225 м.Київ пр.С.Бандери
                        <br/> +38 063 6286630
                    </p>
                </div>
                <div className="contacts_registration">
                    <p className="contacts_registration_title">Реєстраційні дані ГО</p>
                </div>
            </div>
            <FeedbackForm/>
        </div>
    );
};

export default Contacts;
