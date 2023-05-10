import React from 'react';
import './Navbar.scss'
import logo from '../../assets/logo.svg'

const Navbar = () => {
    return (
        <nav>
            <div className={'navbar_logo'}>
                <img src={logo} alt="murfecto logo"/>
            </div>
            <div className={'navbar_links links'}>
                <a href={'#'}>
                    Про притулок
                </a>
                <a href={'#'}>
                    Наші хвости
                </a>
                <a href={'#'}>
                    Контакти
                </a>
            </div>
            <div id={'donation'} className={'navbar_links donation'}>
                <a href={'#'}>
                    Нагодуй кота
                </a>
            </div>
        </nav>
    );
};

export default Navbar;