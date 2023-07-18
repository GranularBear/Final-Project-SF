import React from 'react';

import Header from '../../Components/Sections/HeaderComp/Header';
import Footer from '../../Components/Sections/FooterComp/Footer';
import ScanField from '../../Components/ScanFieldComp/ScanField';

const SearchPage = (props) => {

    return (
        <>
            <Header />
            <main>
                <ScanField />
            </main>
        </>
    )
}

export default SearchPage;