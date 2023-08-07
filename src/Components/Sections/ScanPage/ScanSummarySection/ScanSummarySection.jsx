import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../AuthContext";

import HistogramCarousel from "../../../HistogramCarouselComp/HistogramCarousel";
import ScanDocumentsEntry from "../../../ScanDocumentsEntryComp/ScanDocumentEntry";
import Button from "../../../ButtonComp/Button";

import './ScanSummarySection.scss';


const ScanSummarySection = () => {
    const [totalDocuments, setTotalDocuments] = useState(0);
    const { histogramData, visibleDocuments, documentIDs, loadDocuments, currentDocumentPage } = useAuth();

    useEffect(() => {
        if (histogramData.data[0]) {
            let total = 0;
            histogramData.data[0].data.map((item, index) => {
                total += item.value
            });
            setTotalDocuments(total);
        }
    }, [histogramData, totalDocuments])


    return (
        <div className="search-summary-section_container">
            <h2 className="sub-title search-summary-section_sub-title">Общая сводка</h2>
            <p className="search-summary-section_findings-summary">{`Найдено ${totalDocuments} вариантов`}</p>
            <HistogramCarousel data={histogramData} />
            {!histogramData || !histogramData.data || histogramData.data.length < 2 || !histogramData.data[0].data || !histogramData.data[1].data ? '' : 
            <>
                <h2 className="sub-title search-summary-section_sub-title">Список документов</h2>
                <div className="search-summary-section_document-list">
                    {visibleDocuments.map(doc => (
                            <ScanDocumentsEntry key={doc.ok.id} newsContent={doc.ok} />
                    ))}
                </div>
                {currentDocumentPage * 10 < documentIDs.length && visibleDocuments.length ?
                <Button className={`search-summary-section_button`} text={'Показать больше'} onClick={loadDocuments} />
                : <p className="search-summary-section_loading-info">Список документов загружается. Пожалуйста, подождите</p>}
            </>
        }
        </div>

    )
}

export default ScanSummarySection;