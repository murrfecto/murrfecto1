import React, {useEffect, useState} from 'react';
import {useMediaQuery} from "@mui/material";
import {motion} from "framer-motion";
import './Sidebar.scss'
import SubMenu from "./SubMenu";
import {RxExit} from "react-icons/rx";

const Sidebar = () => {
    let isTab = useMediaQuery("(max-width:768px)");

    const [isOpen, setIsOpen] = useState(isTab ? false : true);

    const Sidebar_animation = isTab
        ? {
            open: {
                x: 0,
                width: "16rem",
                transition: {
                    damping: 40,
                },
            },
            closed: {
                x: -250,
                width: 0,
                transition: {
                    damping: 40,
                },
            },
        }
        : {
            //
            open: {
                width: "16rem",
                transition: {
                    damping: 40,
                    delay: 0.15,
                },
            },
            closed: {
                width: "4rem",
                transition: {
                    damping: 40,
                },
            },
        };

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
            name: "Звіти",
            menus: [
                {title: "Звіти", link: "ViewAllReports"},
                {title: "Додати звіт", link: "addReport"},
            ],
        },
    ];

    useEffect(() => {
        if (isTab) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }, [isTab]);

    return (
        <div className="sidebar">

            <div>

                <motion.div
                    variants={Sidebar_animation}
                    animate={isOpen ? "open" : "closed"}
                    className="sidebar__wrapper"
                >
                    <div className='sidebar__menu'>
                        <ul className="sidebar__menu_list">
                            {(isOpen || isTab) && (
                                <div className="submenu">
                                    {subMenuList?.map((menu) => (
                                        <div key={menu.name}
                                             className="submenu__container">
                                            <SubMenu data={menu}/>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <button className='logoutBtn'>Вийти <RxExit size={20}/></button>
                        </ul>

                    </div>

                </motion.div>

            </div>
        </div>
    );
};

export default Sidebar;