import React, { useEffect } from "react";
import { useAuth } from "../../../AuthContext";

import Header from '../../../Components/Sections/HeaderComp/Header';
import ScanFieldSection from '../../../Components/Sections/ScanPage/ScanFieldSection/ScanFieldSection';
import ScanLoaderSection from '../../../Components/Sections/ScanPage/ScanLoaderSection/ScanLoaderSection';
import ScanSummarySection from '../../../Components/Sections/ScanPage/ScanSummarySection/ScanSummarySection';
import Footer from '../../../Components/Sections/FooterComp/Footer';

import classes from './ScanPage.module.scss';

const ScanPage = (props) => {
    const { loadingHistogram, setLoadingHistogram, isScanAttempted, setIsScanAttempted } = useAuth();

    useEffect(() => {
        setLoadingHistogram(false);
        setIsScanAttempted(false);
    }, [])

    return (
        <>
            <Header />
            <main className={classes.mainContainer}> 
                {!isScanAttempted && !loadingHistogram ?
                    <ScanFieldSection />
                : isScanAttempted && loadingHistogram ?
                    <ScanLoaderSection />
                : isScanAttempted && !loadingHistogram ?
                    <ScanSummarySection /> 
                : ''
                }
            </main>
            <Footer />
        </>
    )
}

export default ScanPage;