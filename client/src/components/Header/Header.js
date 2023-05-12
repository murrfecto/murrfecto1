import React from 'react';
import Infobox from "../Infobox/Infobox";
import Navbar from "../Navbar/Navbar";
import './Header.scss';


const Header = () => {
    return (
        <div className="header">
            <Infobox/>
            <Navbar/>

        </div>
    );
};

export default Header;