import { useAuth } from "../../AuthContext";

import Header from '../../Components/Sections/HeaderComp/Header';
import ScanFieldSection from '../../Components/Sections/SearchPage/ScanFieldSection/ScanFieldSection';
import SearchLoaderSection from '../../Components/Sections/SearchPage/SearchLoaderSection/SearchLoaderSection';
import SearchSummarySection from '../../Components/Sections/SearchPage/SearchSummarySection/SearchSummarySection';
import Footer from '../../Components/Sections/FooterComp/Footer';

import classes from './SearchPage.module.scss';

const SearchPage = (props) => {
    const { loadingHistogram, isScanAttempted } = useAuth();

    return (
        <>
            <Header />
            <main className={classes.mainContainer}> 
                {!isScanAttempted && !loadingHistogram ?
                    <ScanFieldSection />
                : isScanAttempted && loadingHistogram ?
                    <SearchLoaderSection />
                : isScanAttempted && !loadingHistogram ?
                    <SearchSummarySection /> 
                : ''
                }
            </main>
            <Footer />
        </>
    )
}

export default SearchPage;