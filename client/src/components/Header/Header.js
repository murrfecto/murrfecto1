import { useMediaQuery } from "@mui/material";
import "./Header.scss";
import MobileMenu from "./MobileMenu/MobileMenu";
import Infobox from "./Infobox/Infobox";
import Navbar from "./Navbar/Navbar";

const Header = () => {
  const isMobileTablet = useMediaQuery("(max-width: 1439.9px)");

  return (
    <>
      {isMobileTablet ? (
        <MobileMenu />
      ) : (
        <div className="header">
          <Infobox />
          <Navbar />
        </div>
      )}
    </>
  );
};

export default Header;
