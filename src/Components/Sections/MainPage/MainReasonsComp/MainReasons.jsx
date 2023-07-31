import React, { useState, useEffect } from "react";

import MainPageCarousel from "../../../MainPageCarouselComp/MainPageCarousel";

import "./MainReasons.scss"

const MainReasons = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
        const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(screenWidth > 500);

        useEffect(() => {
            const handleResize = () => {
                const newScreenWidth = window.innerWidth;
                const newIsAboveBreakpoint = newScreenWidth > 500;

                if (newIsAboveBreakpoint !== isAboveBreakpoint) {
                    setScreenWidth(newScreenWidth);
                    setIsAboveBreakpoint(newIsAboveBreakpoint);
                }
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            }
        }, [isAboveBreakpoint]);

    return (
        <div className="main-reasons_wrapper">
            {isAboveBreakpoint ?
            <h2 className="sub-title">Почему именно мы</h2>
            : <h2 className="sub-title">Почему<br/>именно мы</h2>
            }
            <MainPageCarousel />
            <div className="main-reasons_image-wrapper"></div>
        </div>
    )
}

export default MainReasons;