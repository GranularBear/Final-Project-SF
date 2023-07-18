import React from "react";

import Button from "../ButtonComp/Button";

import './RateCard.scss';

const RateCard = (props) => {

    return (
        <div 
            className={'card-container' + (props.index === 0 && props.active ? ' orange-border' : props.index === 1 && props.active ? ' turquoise-border' : props.index === 2 && props.active ? ' black-border' : '')}
        >
            <div
                className={'card-header' + (!props.active ? ' header-radius' : '') + (props.index === 0 ? ' orange' : props.index === 1 ? ' turquoise' : ' black')}
            >
                <div className="header-wrapper">
                    <div 
                        className={'title-wrapper' + (props.index === 2 ? ' white-text' : '')}
                    >
                        <p className="card-title">{props.title}</p>
                        <p className="card-description">{props.description}</p>
                    </div>
                    {props.index === 0 ? 
                        <div className="card-icon bulb"></div>
                        : props.index === 1 ?
                        <div className="card-icon target"></div>
                        : props.index === 2 ?
                        <div className="card-icon laptop"></div>
                        : ''                      
                    }
                </div>
            </div>
            <div className="card-body">
                <div className="rate-price">
                    {props.active ?
                        <div className='current-rate-badge'>Текущий тариф</div>
                        : <div className="rate-badge-empty"/>
                    }
                    <div className='price-wrapper'>
                        <div className="price">{props.sale} ₽</div>
                        <div className="price saled">{props.price} ₽</div>
                    </div>
                    {props.index !== 2 ?
                        <div className='installment-rate'>или {props.installmentRate} ₽/мес. при рассрочке на 24 мес.</div> 
                        : <div></div>
                    }
                </div>
                <div className="rate-perks">
                    <p>В тариф входит:</p>
                        <ul className="perks-list">
                            {props.perks.map(perk => <li key={perk}><span> </span>{perk}</li>)}
                        </ul>
                </div>
                <div className='button-wrapper'>
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