import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink, useLocation } from 'react-router-dom';
import './Submenu.scss';

const SubMenu = ({ data }) => {
    const { name, menus,linkName } = data;
    const { pathname } = useLocation();
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    return (
        <div className="submenus">
            <li
                className={`submenus__link ${pathname.includes(data.linkName) && 'activeLink'}`}
                onClick={() => setSubMenuOpen(!subMenuOpen)}
            >
                <p className="submenus__link_name">{name}</p>

                <IoIosArrowDown
                    className={`${subMenuOpen && 'submenus__link_arrow-active'} submenus__link_arrow`}
                />

            </li>
            <hr/>
            <motion.ul
                animate={subMenuOpen ? { height: 'fit-content' } : { height: 0 }}
                className="submenus__item"
            >
                <ul>
                    {menus.map((menu, index) => (
                        <li key={index}>
                            <NavLink
                                className={`submenus__link navLink `}
                                to={`/admin/${linkName}/${menu.link}`}
                            >
                                {menu.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </motion.ul>
        </div>
    );
};

export default SubMenu;