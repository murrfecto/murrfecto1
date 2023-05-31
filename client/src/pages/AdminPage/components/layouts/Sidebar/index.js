import React, {useEffect, useState} from 'react';
import {useMediaQuery} from "@mui/material";
import {MdMenu} from "react-icons/md";
import {motion} from "framer-motion";
import './Sidebar.scss'
import {IoIosArrowBack} from "react-icons/io";
import {FaClipboardList} from "react-icons/fa";
import {GiCat} from "react-icons/gi";
import SubMenu from "./SubMenu";

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
            icon: GiCat,
            menus: [
                {title: "Всі коти", link: "ViewAllCats"},
                {title: "додати котаc", link: "addCat"},
            ],
        },
        {
            name: "Звіти",
            icon: FaClipboardList,
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
            <MdMenu size={30} onClick={() => setIsOpen(true)}
                    className="sidebar__icon"/>

            <div>
                <div onClick={() => setIsOpen(false)}
                     className={`sidebar__overlay ${isOpen ? 'block' : 'hidden'}`}>
                </div>
                <motion.div
                    variants={Sidebar_animation}
                    animate={isOpen ? "open" : "closed"}
                    className="sidebar__wrapper"
                >
                    <div className='sidebar__menu'>
                        <ul className="sidebar__menu_list">
                            {(isOpen || isTab) && (
                                <div className="submenu">
                                    <small className="submenu__label">Murrfecto</small>
                                    {subMenuList?.map((menu) => (
                                        <div key={menu.name}
                                             className="submenu__container">
                                            <SubMenu data={menu}/>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ul>
                    </div>
                    <motion.div
                        animate={
                            isOpen
                                ? {
                                    x: 0,
                                    y: 0,
                                    rotate: 0,
                                }
                                : {
                                    x: -10,
                                    y: -200,
                                    rotate: 180,
                                }
                        }
                        transition={{
                            duration: 0,
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="control__btn">
                        <IoIosArrowBack size={25}/>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
};

export default Sidebar;