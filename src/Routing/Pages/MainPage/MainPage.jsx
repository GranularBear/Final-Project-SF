import React from "react";

import Header from '../../../Components/Sections/HeaderComp/Header';
import MainDescription from '../../../Components/Sections/MainPage/MainDescriptionComp/MainDescription';
import MainReasons from '../../../Components/Sections/MainPage/MainReasonsComp/MainReasons';
import RatesMenu from '../../../Components/Sections/MainPage/RatesMenuComp/RatesMenu';
import Footer from '../../../Components/Sections/FooterComp/Footer';

import RatesDB from '../../../RatesDB'

const HomePage = (props) => {

    return (
        <>
            <Header />
            <main>
                <MainDescription />
                <MainReasons />
                <RatesMenu rates={RatesDB} />
            </main>
            <Footer />
        </>
    )
}

export default HomePage;