import React, { useState, useEffect } from "react";

import './MainDescription.scss'

import Button from "../../../ButtonComp/Button";


const MainDescription = () => {
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
        <div className="main-description-container">
            <div className="description-wrapper">
                <h1 className="main-title">Сервис по поиску<br/>публикаций<br/>о компании<br/>по его ИНН</h1>
                {isAboveBreakpoint ? 
                <p className="main-description">Комплексный анализ публикаций, получение данных<br/> в формате PDF на электронную почту.</p>
                : <p className="main-description">Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                }
                <Button color='#5970FF' textColor='#FFF' text='Запросить данные' />
            </div>
            <div className="main-image-wrapper"></div>
        </div>
    )
}

export default MainDescription;