import React, { useState, useEffect } from "react";

import carouselMockText from "./CarouselMockText";

import './MainPageCarousel.scss';

const MainPageCarousel = () => {
        const [currentCard, setCurrentCard] = useState(0);
        const [screenWidth, setScreenWidth] = useState(window.innerWidth);
        const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(screenWidth > 980);

        const carouselCards = carouselMockText;

        const nextCard = () => {
            setCurrentCard((prevCard) => (prevCard + 1) % carouselCards.length);
        };

        const prevCard = () => {
            setCurrentCard((prevCard) => (prevCard - 1 + carouselCards.length) % carouselCards.length);
        };

        const getVisibleCards = () => {
            const visibleCards = [];

            if (isAboveBreakpoint) {
                for (let i = currentCard - 1; i <= currentCard + 1; i++) {
                    const index = (i + carouselCards.length) % carouselCards.length;
                    visibleCards.push(carouselCards[index]);
                }
            } else {
                visibleCards.push(carouselCards[currentCard]);
            }

            return visibleCards;
        }
        const visilbeCardsCount = getVisibleCards().length;

        useEffect(() => {
            const handleResize = () => {
                const newScreenWidth = window.innerWidth;
                const newIsAboveBreakpoint = newScreenWidth > 980;

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
            <div className="main-carousel_wrapper">
                <i className="main-carousel_arrow left" onClick={prevCard}/>
                <div className={`main-carousel_card-container ${visilbeCardsCount === 1 ? 'single-card' : ''}`}>
                {getVisibleCards().map((card, index) => (
                    <div
                        className={`main-carousel_card ${index === 1 ? 'active' : '' }`}
                        key={card.text + index}
                    >
                        <img src={card.icon} alt='Card Icon' />
                        <p>{card.text}</p>
                    </div>
                ))}
                </div>
                <i className="main-carousel_arrow right" onClick={nextCard} />
            </div>
    )
}

export default MainPageCarousel;