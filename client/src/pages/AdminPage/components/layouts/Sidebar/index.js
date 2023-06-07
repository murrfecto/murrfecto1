import React, {useContext} from 'react';
import {motion} from "framer-motion";
import './Sidebar.scss';
import SubMenu from "./SubMenu";
import {RxExit} from "react-icons/rx";
import {UserContext} from "../../../../../context/userContext";
import {useDispatch} from "react-redux";
import {authActions} from "../../../../../store";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";

const Sidebar = () => {
    const {setUser} = useContext(UserContext);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutUser = () => {
        setUser(null);
    };
    const subMenuList = [
        {
            name: "Наші хвости",
            linkName: 'cats',
            menus: [
                {title: "Всі коти", link: "ViewAllCats"},
                {title: "Додати кота", link: "addCat"},
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

    const logout = () => {
        Cookies.remove('token');
        dispatch(authActions.logout());
        navigate('/admin');
    };


    return (
        <div className="sidebar">
            <div>
                <motion.div
                    className="sidebar__wrapper">
                    <div className="sidebar__menu">
                        <ul className="sidebar__menu_list">
                            <div className="submenu">
                                {subMenuList?.map((menu) => (
                                    <div key={menu.name}
                                         className="submenu__container">
                                        <SubMenu data={menu}/>
                                    </div>
                                ))}
                            </div>
                            <button className="logoutBtn" onClick={logout}>
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
