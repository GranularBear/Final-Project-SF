import React from 'react';

import Header from '../../Components/Sections/HeaderComp/Header';
import ScanFieldSection from '../../Components/Sections/SearchPage/ScanFieldSection';
import Footer from '../../Components/Sections/FooterComp/Footer';

import classes from './SearchPage.module.scss';

const SearchPage = (props) => {

    return (
        <>
            <Header />
            <main className={classes.mainContainer}>
                <ScanFieldSection />
            </main>
            <Footer />
        </>
    )
}

export default SearchPage;