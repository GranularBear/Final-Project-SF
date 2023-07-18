import React from "react";

import './Loader.scss';

import loaderImage from '../../Icons/loader-icon.jpg';

const Loader = () => {

    return (
        <div className="loader">
            <img src={loaderImage} alt='Loading' className="loader-circles"></img>
        </div>
    );
};

export default Loader;