import React, { useState, useEffect } from "react";

import Carousel from "../../../CarouselComp/Carousel";

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
        <div className="reasons-wrapper">
            {isAboveBreakpoint ?
            <h2 className="sub-title">Почему именно мы</h2>
            : <h2 className="sub-title">Почему<br/>именно мы</h2>
            }
            <Carousel />
            <div className="image-wrapper"></div>
        </div>
    )
}

export default MainReasons;