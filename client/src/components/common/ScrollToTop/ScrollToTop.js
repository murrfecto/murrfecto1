import { useState, useEffect } from "react";
import "./ScrollToTop.scss";

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
    <button className={"scrollBtn"} onClick={scrollToTop}>
      &#8679;
    </button>
  ) : null;
};

export default ScrollToTop;
