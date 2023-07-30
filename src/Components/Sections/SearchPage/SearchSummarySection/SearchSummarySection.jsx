import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../AuthContext";

import HistogramCarousel from "../../../HistogramCarouselComp/HistogramCarousel";
import ScanDocumentsEntry from "../../../ScanDocumentsEntryComp/ScanDocumentEntry";
import Button from "../../../ButtonComp/Button";

import './SearchSummarySection.scss';


const SearchSummarySection = () => {
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

        console.log(totalDocuments)
    }, [histogramData, totalDocuments])


    return (
        <div className="search-summary-section_container">
            <h3 className="search-summary-section_sub-title">Общая сводка</h3>
            <p className="search-summary-section_findings-summary">{`Найдено ${totalDocuments} вариантов`}</p>
            <HistogramCarousel data={histogramData} />
            {!histogramData || !histogramData.data || histogramData.data.length < 2 || !histogramData.data[0].data || !histogramData.data[1].data ? '' : 
            <>
                <h3 className="search-summary-section_sub-title">Список документов</h3>
                <div className="search-summary-section_document-list">
                    {visibleDocuments.map(doc => (
                        <>
                            <ScanDocumentsEntry key={doc.ok.id} newsContent={doc.ok} />
                        </>
                    ))}
                </div>
                {currentDocumentPage * 10 < documentIDs.length && <Button className={`search-summary-section_button`} text={'Показать больше'} onClick={loadDocuments} />}
            </>
        }
        </div>

    )
}

export default SearchSummarySection;