import { useState, useEffect } from "react";
import "./ScrollToTop.scss";
import { ReactComponent as Icon } from "../../../assets/header/shift.svg";

const ScrollToTop = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setShowScrollBtn(true);
    } else {
      setShowScrollBtn(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return showScrollBtn ? (
    <button id={"data-scroll"} className={"scrollBtn"} onClick={scrollToTop}>
      <Icon className="shift_icon" />
    </button>
  ) : null;
};

export default ScrollToTop;
