import React from "react";

import './ScanLoaderSection.scss';

const ScanLoaderSection = () => {

    return (
        <div className="search-loader-section_container">
            <div className="search-loader-section_left-part">
                <h2 className="sub-title search-loader-section_sub-title">Ищем. Скоро будут результаты</h2>
                <p className="search-loader-section_information">Поиск может занять некоторое время, просим сохранять терпение.</p>
            </div>
            <div className="search-loader-section_right-part">
                <div className="search-loader-section_image-container"></div>
            </div>
        </div> 
    )
}

export default ScanLoaderSection