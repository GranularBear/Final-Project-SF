import React, { useEffect, useState, useRef } from "react";

import './HistogramCarousel.scss';

const CarouselContent = ({data}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isArrowActive, setIsArrowActive] = useState({left: false, right: false});
    const [visibleItems, setVisibleItems] = useState(10);
    const [itemWidth, setItemWidth] = useState(145);
    const [isSingleItemVisible, setIsSingleItemVisible] = useState(false);

    const carouselContainerRef = useRef(null);

    const mergedData = data.data[0].data.map((item,index) => {
        if (!data.data[1].data[index]) return null;

        return {
            date: item.date,
            totalDocuments: item.value,
            riskFactors: data.data[1].data[index].value
        }
    });

    const sortedData = mergedData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const displayedData = sortedData.slice(currentIndex, (currentIndex + visibleItems) - 1);

    const moveNext = () => {
        const nextIndex = currentIndex + visibleItems - 1;
        if (nextIndex < sortedData.length) {
            setCurrentIndex(nextIndex);
        }
    }

    const movePrev = () => {
        if(currentIndex > 0) {
            setCurrentIndex(prevIndex => (prevIndex - visibleItems + 1 + sortedData.length) % sortedData.length);
        }
    }


    useEffect(() => {
        if (currentIndex + visibleItems - 1 < sortedData.length) {
            setIsArrowActive(prevState => ({...prevState, right: true}))
        } else {
            setIsArrowActive(prevState => ({...prevState, right: false}))
        }
        
        if (currentIndex > 0) {
            setIsArrowActive(prevState => ({...prevState, left: true}))
        } else {
            setIsArrowActive(prevState => ({...prevState, left: false}))
        }
    }, [currentIndex, sortedData.length, visibleItems]);


    useEffect(() => {
        const updateItemWidth = () => {
            if (carouselContainerRef.current) {
                const containerWidth = carouselContainerRef.current.offsetWidth;
                if (itemWidth > 0) {
                  setVisibleItems(Math.floor(containerWidth / itemWidth));
                }
            }
        }

        let resizeTimer;
        const handleResize = () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(updateItemWidth, 100);
        }

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(carouselContainerRef.current);

        return () => {
          resizeObserver.disconnect();
          clearTimeout(resizeTimer);
        };
    }, [itemWidth]);

        if (visibleItems < 2) {
            setVisibleItems(2)
        }

    return (
        <div className="histogram-carousel_container"  ref={carouselContainerRef}>
            <div className={`histogram-carousel_arrow left ${isArrowActive.left ? 'active' : ''}`} onClick={movePrev}/>
            <div className="histogram-carousel_wrapper">
                <div className="histogram-carousel_cell initial-cell">
                    <p className="histogram-carousel_cell-info initial-cell">Период</p>
                    <p className="histogram-carousel_cell-info initial-cell">Всего</p>
                    <p className="histogram-carousel_cell-info initial-cell">Риски</p>
                </div>
                <div className="histogram-carousel_cell-info-container">
                        {displayedData.map((item, index) => (
                            <div key={`histogram_entry_${index}`} className="histogram-carousel_cell-info-entry"
                            // ref={el => {
                            //     if (el && index === 0) {
                            //         setItemWidth(el.offsetWidth);
                            //     }
                            // }}
                            >
                                <div className="histogram-carousel_cell data-cell">
                                    <p className="histogram-carousel_cell-info">{new Date(item.date).toLocaleDateString()}</p>
                                    <p className="histogram-carousel_cell-info">{item.totalDocuments}</p>
                                    <p className="histogram-carousel_cell-info">{item.riskFactors}</p>
                                </div>
                            </div>
                    ))
                }
                </div>
            </div>
            <div className={`histogram-carousel_arrow right ${isArrowActive.right ? 'active' : ''}`} onClick={moveNext}/>
        </div>
    )
}

const NoDataCarousel = () => {

    return (
        <div className="histogram-carousel_container no-data-carousel">
            <div className="histogram-carousel_wrapper">
                <div className="histogram-carousel_cell initial-cell">
                    <p className="histogram-carousel_cell-info initial-cell">Период</p>
                    <p className="histogram-carousel_cell-info initial-cell">Всего</p>
                    <p className="histogram-carousel_cell-info initial-cell">Риски</p>
                </div>
                    <p className="histogram-carousel_no-data-message">Не удалось найти данные</p>
            </div>
        </div>
    )
}

const HistogramCarousel = ({data}) => {
    if (!data || !data.data || data.data.length < 2 || !data.data[0].data || !data.data[1].data) {
        return <NoDataCarousel />
    }

    return <CarouselContent key={``} data={data}/>
}

export default HistogramCarousel;