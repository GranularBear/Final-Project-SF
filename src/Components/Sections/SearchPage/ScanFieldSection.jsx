import React from "react";

import ScanField from "../../ScanFieldComp/ScanField";

import './ScanFieldSection.scss';

const ScanFieldSection = () => {

    return (
        <div className="scan-field-section_container">
                <div className="scan-field-section_description-wrapper">
                    <h2 className="scan-field-section_sub-title">Найдите необходимые данные в пару кликов</h2>
                    <div className="scan-field-section_document-icon scan-field_description-wrapper_mobile-icon"></div>
                    <p className="scan-field-section_description">Задайте параметры поиска.</p>
                    <p className="scan-field-section_description">Чем больше заполните, тем точнее поиск</p>
                </div>
                <div className="scan-field-section_scan-field-wrapper">
                    <ScanField />
                </div>
                <div className="scan-field-section_document-icons-wrapper">
                    <div className="scan-field-section_document-icon"></div>
                    <div className="scan-field-section_folders-icon"></div>
                </div>
                <div className="scan-field-section_search-rocket-img-wrapper"></div>
        </div>
    )
}

export default ScanFieldSection;