import React from 'react';

import Header from '../../Components/Sections/HeaderComp/Header';
import Footer from '../../Components/Sections/FooterComp/Footer';
import AuthorizationComp from '../../Components/Sections/AuthorizationPage/AuthorizationComp/AuthorizationComp';

import classes from './AuthorizationPage.module.scss';


const AuthorizationPage = (props) => {

    return (
        <>
            <Header />
            <main className={classes.mainContainer}>
                <AuthorizationComp />
            </main>
            <Footer />
        </>
    )
}

export default AuthorizationPage;