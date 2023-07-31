import React from "react";

import Button from "../ButtonComp/Button";

import './RateCard.scss';

const RateCard = (props) => {

    return (
        <div 
            className={'rate-card_container' + (props.index === 0 && props.active ? ' orange-border' : props.index === 1 && props.active ? ' turquoise-border' : props.index === 2 && props.active ? ' black-border' : '')}
        >
            <div
                className={'rate-card_header' + (!props.active ? ' rate-card_header-radius' : ' rate-card_header-radius_active') + (props.index === 0 ? ' rate-card_orange' : props.index === 1 ? ' rate-card_turquoise' : ' rate-card_black')}
            >
                <div className="rate-card_header-wrapper">
                    <div 
                        className={'title-wrapper' + (props.index === 2 ? ' white-text' : '')}
                    >
                        <p className="rate-card_title">{props.title}</p>
                        <p className="rate-card_description">{props.description}</p>
                    </div>
                    {props.index === 0 ? 
                        <div className="rate-card_icon rate-catd_bulb-icon"></div>
                        : props.index === 1 ?
                        <div className="rate-card_icon rate-catd_target-icon"></div>
                        : props.index === 2 ?
                        <div className="rate-card_icon rate-catd_laptop-icon"></div>
                        : ''                      
                    }
                </div>
            </div>
            <div className="rate-card_body">
                <div className="rate-card_price">
                    {props.active ?
                        <div className='current-rate-badge'>Текущий тариф</div>
                        : <div className="rate-badge-empty"/>
                    }
                    <div className='rate-card_price-wrapper'>
                        <div className="rate_price">{props.sale} ₽</div>
                        <div className="rate_price rate_price-saled">{props.price} ₽</div>
                    </div>
                    {props.index !== 2 ?
                        <div className='rate-card_installment-rate'>или {props.installmentRate} ₽/мес. при рассрочке на 24 мес.</div> 
                        : <div></div>
                    }
                </div>
                <div className="rate-card_perks">
                    <p>В тариф входит:</p>
                        <ul className="rate-card_perks-list">
                            {props.perks.map(perk => <li key={perk}><span> </span>{perk}</li>)}
                        </ul>
                </div>
                <div className='rate-card_button-wrapper'>
                    {props.active ? 
                        <Button backgroundColor='#D2D2D2' textColor='#000' text='Перейти в личный кабинет' className={'rate-card_button'} /> 
                        : <Button backgroundColor='#5970FF' textColor='#FFF' text='Подробнее' className={'rate-card_button'}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default RateCard;