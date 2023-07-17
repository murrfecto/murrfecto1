import {useMediaQuery} from "@mui/material";
import "./Header.scss";
import MobileMenu from "./MobileMenu/MobileMenu";
import Infobox from "./Infobox/Infobox";
import Navbar from "./Navbar/Navbar";

const Header = () => {
    const isSmallScreen = useMediaQuery("(max-width: 925px)");
  
  return (
      <div className='layout-container'>
          {isSmallScreen ?(
              <MobileMenu/>
          ):(
              <div className="header">
                  <Infobox />
                  <Navbar />
              </div>
          )}
      </div>

  );
};

export default Header;
