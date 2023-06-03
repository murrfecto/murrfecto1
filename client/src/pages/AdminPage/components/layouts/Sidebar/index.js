import React, {useEffect, useState} from 'react';
import {useMediaQuery} from "@mui/material";
import {motion} from "framer-motion";
import './Sidebar.scss'
import SubMenu from "./SubMenu";
import {RxExit} from "react-icons/rx";

const Sidebar = ({setIsAdmin}) => {

    const subMenuList = [
        {
            name: "Наші хвости",
            linkName:'cats',
            menus: [
                {title: "Всі коти", link: "ViewAllCats"},
                {title: "додати кота", link: "addCat"},
            ],
        },
        {
            name: "Звітність",
            linkName: 'reports',
            menus: [
                {title: "Звіти", link: "viewReports"},

            ],
        },
    ];


    return (
        <div className="sidebar">

            <div>

                <motion.div
                    className="sidebar__wrapper"
                >
                    <div className='sidebar__menu'>
                        <ul className="sidebar__menu_list">
                                <div className="submenu">
                                    {subMenuList?.map((menu) => (
                                        <div key={menu.name}
                                             className="submenu__container">
                                            <SubMenu data={menu}/>
                                        </div>
                                    ))}
                                </div>
                            <button className='logoutBtn' >Вийти <RxExit size={20}/></button>
                        </ul>

                    </div>

                </motion.div>

            </div>
        </div>
    );
};

export default Sidebar;