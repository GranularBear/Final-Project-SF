import React from "react";

import AuthorizationForm from '../../../AuthorizationFormComp/AuthorizationForm';

import './AuthorizationComp.scss'

const AuthorizationComp = () => {

    return (
        <div className="authorization-comp-wrapper">
            <div className="authorization-description-wrapper">
                <h2 className="authorization-title">
                    Для оформления подписки<br/>на тариф необходимо<br/>авторизоваться
                </h2>
                <div className="characters-icon">
                </div>
            </div>
            <AuthorizationForm />
            <div className="characters-icon-mobile"></div>
        </div>
    )
}

export default AuthorizationComp;