import React from 'react';
import {motion} from "framer-motion";
import './Sidebar.scss'
import SubMenu from "./SubMenu";
import {RxExit} from "react-icons/rx";

const Sidebar = ({setIsAdmin}) => {

    const subMenuList = [
        {
            name: "Наші хвости",
            linkName: 'cats',
            menus: [
                {title: "Всі коти", link: "ViewAllCats"},
                {title: "Додати кота", link: "addCat"},
                {title: "Редагувати кота", link: "editCat"},
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
                    className="sidebar__wrapper">
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
                            <button className='logoutBtn'>
                                Вийти<RxExit size={20}/>
                            </button>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Sidebar;
