import { useState, useEffect } from "react";

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

  const scrollBtn = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    display: showScrollBtn ? "block" : "none",
    width: "50px",
    height: "50px",
    lineHeight: "33px",
    fontSize: "33px",
    backgroundColor: "#4b3542",
    color: "#ffffff",
    border: "transparent",
    borderRadius: "50%",
    boxShadow: "0px 3.43693px 3.43693px #766e78",
    cursor: "pointer",

    transition: "all 300ms linear",

    "&:hover": {
      backgroundColor: "#006b5f",
      transform: "scale(1.1)",
    },
  };

  return (
    <button style={scrollBtn} onClick={scrollToTop}>
      &#8679;
    </button>
  );
};

export default ScrollToTop;
