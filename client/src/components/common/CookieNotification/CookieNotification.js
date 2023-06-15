import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CookieNotification.scss";
import { ReactComponent as Info } from "../../../assets/footer/info.svg";

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
    <section className="cookie_section">
      <div className="cookie_notification container">
        <div className="info_wrapper">
          {" "}
          <Info className="info-icon" />
          <p className="cookie_notification-text">
            Цей сайт використовує файли cookies для правильної роботи і
            покращення сервісу. Якщо ви погоджуєтесь з їхнім використанням,
            натисніть ОК. Більше інформації в{" "}
            <Link
              className={"footer_link cookie_privat-policy"}
              to={"/privacy-policy"}
            >
              Політика конфіденційності
            </Link>
          </p>
        </div>

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
  );
};

export default CookieNotification;
