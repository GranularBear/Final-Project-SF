import React from "react";

import RateCard from "../../../RateCardComp/RateCard";

import './RatesMenu.scss';

const RatesMenu = (props) => {
    const Rates = props.rates;

    return (
        <div className="rates-menu_wrapper">
            <h2 className="sub-title">Наши тарифы</h2>
            <div className="rates-menu_container">
                {Rates.map((rate, index) => (
                    <RateCard
                        key={rate.title} title={rate.title} index={index} description={rate.description} price={rate.price} sale={rate.sale} installmentRate={rate.installmentRate} perks={rate.perks} active={rate.active}
                    ></RateCard>
                ))}
            </div>
        </div>
        
    )
}
export default RatesMenu;