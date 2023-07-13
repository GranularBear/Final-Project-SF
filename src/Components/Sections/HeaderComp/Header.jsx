import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import './Header.scss';

const Header = (props) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isClosingAnimation, setIsClosingAnimation] = useState(false);

    const handleMobileMenuToggle = () => {
        if (isMobileMenuOpen) {
            setIsClosingAnimation(true);
            setTimeout(() => {
                setIsMobileMenuOpen(false);
                setIsClosingAnimation(false);
            }, 500)
        } else {
            setIsMobileMenuOpen(true);
        }
    };

    return (
        <header className="header">
                <NavLink to={`/`} className="header-logo"></NavLink>
                <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul className="nav-list">
                         <li><NavLink className={`nav-list-link`} to={`/`}>Главная</NavLink></li>
                         <li>Тарифы</li>
                         <li>FAQ</li>
                    </ul>
                </nav>
                <div className='btn-menu'>
                    <button className="sign-in btn">Зарегистрироваться</button>
                    <NavLink to={`/authorization`} className="log-in btn">Войти</NavLink>
                </div>
                {/* <div className="header-statistics"></div> */}
                <div className={`burger-menu ${isMobileMenuOpen ? 'open' : ''}`} onClick={handleMobileMenuToggle}>
                    <span className="burger-menu-inner"></span>
                </div>
                    <div className={`dropdown-menu ${isMobileMenuOpen ? 'open' : ''} ${isClosingAnimation ? 'closed' : ''}`}>
                        <div className="dropdown-menu-header">
                            <div className="dropdown-menu-logo"></div>
                            <div className="close-dropdown" onClick={handleMobileMenuToggle}>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <ul className="nav-list">
                            <li><NavLink className={`nav-list-link dropdown`} to={`/`}>Главная</NavLink></li>
                            <li>Тарифы</li>
                            <li>FAQ</li>
                        </ul>
                        <button className="sign-up btn">Зарегистрироваться</button>
                        <NavLink to={`/authorization`} className="log-in btn">Войти</NavLink>
                    </div>
        </header> 
    )
}

export default Header;