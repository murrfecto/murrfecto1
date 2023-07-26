import { useState } from "react";
import "./CookieNotification.scss";
import { ReactComponent as Info } from "../../../assets/footer/info.svg";

import PrivacyPolicyPdf from "../../../assets/dataDocs/privacy-policy.pdf";

const CookieNotification = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("cookieNotificationDismissed", "true");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie_backdrop">
    <section className="cookie_section">
      <div className="cookie_notification container">
        <Info className="info-icon" />
        <p className="cookie_notification-text">
          Цей сайт використовує файли cookies для правильної роботи і покращення
          сервісу. Якщо ви погоджуєтесь з їхнім використанням, натисніть ОК.
          Більше інформації в{" "}
          <a
            className={"footer_link cookie_privat-policy"}
            href={PrivacyPolicyPdf + "#toolbar=0"}
            target="_blank"
            aria-readonly
            rel="nofollow noreferrer noopener"
          >
            Політика конфіденційності
          </a>
        </p>

        <button
          id={"data-cookie"}
          className=" accept-btn"
          onClick={handleDismiss}
        >
          Ok
        </button>
        <button className="close-btn" onClick={handleDismiss}>
          &times;
        </button>
      </div>
    </section>
    </div>
  );
};

export default CookieNotification;
