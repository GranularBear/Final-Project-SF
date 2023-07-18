import React, { useState, useEffect, useContext } from "react";

import FieldInput from "../FieldInputComp/FieldInput";
import Button from '../ButtonComp/Button';

import './ScanField.scss';

const ScanField = (props) => {
    const [TINValue, setTINValue] = useState('');
    const [documentQuantityValue, setDocumentQuantityValue] = useState();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const handleTINChange = (event) => {
        setTINValue(event.target.value);
    }

    const handleDocumentQuantityValueChange = (event) => {
        setDocumentQuantityValue(event.target.value);
    }

    return (
        <form className="scan-field-container">
            <div className="obligatory-scan-inputs-wrapper">
                <FieldInput
                    type={'text'}
                    isRequired={true}
                    label={'ИНН компании'}
                    htmlFor={'TIN'}
                    wrapperClassName={'search-input-wrapper'}
                    labelClassName={'search-input-field-label'}
                    inputClassName={'search-input-field-value'}
                    id={'TIN'}
                    name={'TIN'}
                    value={TINValue}
                    onChange={handleTINChange}
                    placeholder={'10 цифр'}
                />
                <FieldInput
                    type={'select'}
                    isRequired={true}
                    label={'Тональность'}
                    htmlFor={'tonality'}
                    wrapperClassName={'search-input-wrapper'}
                    labelClassName={'search-input-field-label'}
                    inputClassName={'search-input-field-value'}
                    id={'tonality'}
                    name={'tonality'}
                    options={[
                        {value: 'option1', label: 'Любая'},
                        {value: 'option2', label: 'Позитивная'},
                        {value: 'option3', label: 'Негативная'},
                    ]}
                />
                <FieldInput
                    type={'number'}
                    isRequired={true}
                    label={'Количество документов в выдаче'}
                    htmlFor={'documentQuantity'}
                    wrapperClassName={'search-input-wrapper'}
                    labelClassName={'search-input-field-label'}
                    inputClassName={'search-input-field-value'}
                    id={'documentQuantity'}
                    name={'documentQuantity'}
                    value={documentQuantityValue}
                    onChange={handleDocumentQuantityValueChange}
                    placeholder={'от 1 до 1000'}
                />
                <FieldInput
                    type={'date'}
                    isRequired={true}
                    label={'Диапазон поиска'}
                    htmlFor={'rangeDate'}
                    wrapperClassName={'search-input-wrapper'}
                    labelClassName={'search-input-field-label'}
                    inputClassName={'search-input-field-value'}
                    id={'rangeDate'}
                    name={'rangeDate'}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={setStartDate}
                    onChange_2={setEndDate}
                />
            </div>
        </form>
    )
}

export default ScanField;