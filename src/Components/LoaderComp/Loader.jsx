import React from "react";

import loaderImage from '../../Icons/Loaders/loader-icon.jpg';

import './Loader.scss';

const Loader = () => {

    return (
        <div className="loader">
            <img src={loaderImage} alt='Loading' className="loader-circles"></img>
        </div>
    );
};

export default Loader;