import React from "react";

import './Footer.scss';

const Footer = () => {

    return (
        <footer className="footer">
            <div className="footer-logo"></div>
            <div className="footer-info">
                <div className="contacts">
                     <p>г. Москва, Цветной б-р, 40</p>
                     <p>+7 495 771 21 11</p>
                     <p>info@skan.ru</p>
                </div>
                <div className="copyright-info">Copyright. 2022</div>
            </div>
            
        </footer>
    )
}

export default Footer;