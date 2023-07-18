import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../AuthContext";

import userIcon from '../../../Icons/user-icon.jpg';

import UserStatisticsMenu from "../../UserStatisticsMenuComp/UserStatisticsMenu";
import Button from "../../ButtonComp/Button";

import './Header.scss';

const Header = (props) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isClosingAnimation, setIsClosingAnimation] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useAuth();

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

    const handleLogOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expire');
        setIsLoggedIn(false);
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
                {isLoggedIn && 
                <UserStatisticsMenu />
                }
                {!isLoggedIn && <div className='btn-menu'>
                    <Button text={'Зарегистрироваться'} className={'header_signUp header_button'} />
                    <NavLink to={`/authorization`}><Button text={'Войти'} className={'header_authorize header_button'} /></NavLink>
                </div>}
                {isLoggedIn && <div className="user-menu">
                    <div className="user-info">
                        <p className="username">Андрей В.</p>
                        <Button text={'Выйти'} className={'header_signOut header_button'} onClick={handleLogOut} />
                    </div>
                    <img className="user-pic" src={userIcon} width='50px' alt="user"></img>
                </div>}
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
                        {isLoggedIn &&
                            <div className="dropdown-user-info">
                                <img className="user-pic" src={userIcon} width='45px' alt="user"></img>
                                <p className="username">Андрей В.</p>
                            </div>
                        }
                        <ul className="nav-list">
                            <li><NavLink className={`nav-list-link dropdown`} to={`/`}>Главная</NavLink></li>
                            <li>Тарифы</li>
                            <li>FAQ</li>
                        </ul>
                        {!isLoggedIn ?
                            <>
                                <Button text={'Зарегистрироваться'} className={'header_signUp header_button'} />
                                <NavLink to={`/authorization`}><Button text={'Войти'} className={'header_authorize header_button'} /></NavLink>
                            </>
                        :   
                            <>
                                <Button text={'Выйти'} className={'header_button header_authorize'} onClick={handleLogOut} />
                            </>
                        }

                    </div>
        </header> 
    )
}

export default Header;