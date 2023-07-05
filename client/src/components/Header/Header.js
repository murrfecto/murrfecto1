import { useMediaQuery } from "@mui/material";
import "./Header.scss";
import MobileMenu from "./MobileMenu/MobileMenu";
import Infobox from "./Infobox/Infobox";
import Navbar from "./Navbar/Navbar";

const Header = () => {

    const isSmallScreen = useMediaQuery("(max-width: 925px)");

  return (
      <>
          {isSmallScreen ?(
              <MobileMenu/>
          ):(
              <div className="header">
                  <Infobox />
                  <hr/>
                  <Navbar />
              </div>
          )}
      </>

  );
};

export default Header;
