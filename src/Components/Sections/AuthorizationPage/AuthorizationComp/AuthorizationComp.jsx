import React from "react";

import AuthorizationForm from '../../../AuthorizationFormComp/AuthorizationForm';

import './AuthorizationComp.scss'

const AuthorizationComp = () => {

    return (
        <div className="authorization-comp_wrapper">
            <div className="authorization-description_wrapper">
                <h2 className="sub-title authorization-title">
                    Для оформления подписки<br/>на тариф необходимо<br/>авторизоваться
                </h2>
                <div className="authorization-comp_characters-icon">
                </div>
            </div>
            <AuthorizationForm />
            <div className="authorization-comp_characters-icon-mobile"></div>
        </div>
    )
}

export default AuthorizationComp;