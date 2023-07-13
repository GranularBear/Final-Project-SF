import React, { useState, useEffect } from "react";

import './Carousel.scss';

const carouselCards = [{
    text: 'Высокая и оперативная скорость обработки заявки',
    icon: require('./icons/TimerIcon.jpg')
}, {
    text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
    icon: require('./icons/MagnifyingGlassIcon.jpg')
}, {
    text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству',
    icon: require('./icons/ShieldIcon.jpg')
}, {
    text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
    icon: require('./icons/MagnifyingGlassIcon.jpg')
}, {
    text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
    icon: require('./icons/ShieldIcon.jpg')
}]

const Carousel = () => {
        const [currentCard, setCurrentCard] = useState(0);
        const [screenWidth, setScreenWidth] = useState(window.innerWidth);
        const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(screenWidth > 980);

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
            <div className="carousel-wrapper">
                <i className="carousel-arrow left" onClick={prevCard}/>
                <div className={`carousel-card-container ${visilbeCardsCount === 1 ? 'single-card' : ''}`}>
                {getVisibleCards().map((card, index) => (
                    <div
                        className={`carousel-card ${index === 1 ? 'active' : '' }`}
                        key={card.text + index}
                    >
                        <img src={card.icon} alt='Card Icon' />
                        <p>{card.text}</p>
                    </div>
                ))}
                </div>
                <i className="carousel-arrow right" onClick={nextCard} />
            </div>
    )
}

export default Carousel;