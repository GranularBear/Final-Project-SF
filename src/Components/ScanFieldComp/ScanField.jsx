import React, { useState, useEffect, useContext } from "react";

import FieldInput from "../FieldInputComp/FieldInput";
import Button from '../ButtonComp/Button';

import './ScanField.scss';

const ScanField = (props) => {
    const [TINValue, setTINValue] = useState('');
    const [documentQuantityValue, setDocumentQuantityValue] = useState();
    const [tonality, setTonality] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [checkboxes, setCheckboxes] = useState({
        scanField_maxCompletenessCheckbox: false,
        scanField_businessContextCheckbox: false,
        scanField_mainRoleCheckbox: false,
        scanField_RiskFactorsOnlyCheckbox: false,
        scanField_includeTechMarketNewsCheckbox: false,
        scanField_includePreviewAndCalendarsCheckbox: false,
        scanField_includeNewsSummaryCheckbox: false,
    })

    const [TINValid, setTINValid] = useState(true);
    const [TINError, setTINError] = useState('');

    const [documentQuantityValid, setDocumentQuantityValid] = useState(true);

    const [datesValid, setDatesValid] = useState(true);

    const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

    useEffect(() => {
        if (isSubmitAttempted) {
            if(TINValid) {
                console.log('Submitted');
            } else {
                console.log(`Not Submitted: ${TINError}`)
            }
        }
    }, [TINValid, TINError, isSubmitAttempted]);

    const handleTINChange = (event) => {
        let value = event.target.value.replace(/[_()\-]+/g,'');
        setTINValue(value);
    }

    const handleDocumentQuantityValueChange = (event) => {
        setDocumentQuantityValue(event.target.value);
    }

    const handleTonalityChange = (option) => {
        setTonality(option);
    }

    const handleCheckboxChange = (event) => {
        setCheckboxes({...checkboxes, [event.target.id]: event.target.checked})
    };

    const validateTIN = (TIN) => {
        let result = false;

        if (!TIN.length) {
            setTINError('Введите ИНН');
            return result;
        } else if (/[^0-9]/.test(TIN)) {
            setTINError('ИНН может состоять только из цифр');
            return result;
        } else if ([10, 12].indexOf(TIN.length) === -1) {
            setTINError('ИНН может состоять только из 10 или 12 цифр');
            return result;
        } else {
            const checkDigit = (TIN, ratios) => {
                let d = 0;
                for (let i in ratios) {
                    d += ratios[i] * TIN[i];
                }
                return parseInt(d % 11 % 10);
            };
            switch (TIN.length) {
                case 10:
                    const d10 = checkDigit(TIN, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if (d10 === parseInt(TIN[9])) {
                        result = true;
                    }
                    break;
                case 12:
                    const d11 = checkDigit(TIN, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    const d12 = checkDigit(TIN, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if ((d11 === parseInt(TIN[10])) && (d12 === parseInt(TIN[11]))) {
                        result = true;
                    }
                    break;
                default: 
                    result = false;
                    setTINError('Введите корректный ИНН');
            }
            if (!result) {
                setTINError('Неправильное контрольное число');
            }
        }
        return result;
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        setTINValid(validateTIN(TINValue));

        setIsSubmitAttempted(true);
    }

    return (
        <form className="scan-field-container" onSubmit={handleSubmit}>
            <div className="obligatory-scan-inputs-wrapper">
                <FieldInput
                    type={'text'}
                    isRequired={true}
                    label={'ИНН компании'}
                    htmlFor={'scanField_TINInput'}
                    wrapperClassName={'search-input-wrapper'}
                    labelClassName={'search-input-field-label'}
                    inputClassName={`search-input-field-entry ${!TINValid ? 'scan-field_incorrect-input' : ''} `}
                    id={'scanField_TINInput'}
                    name={'scanField_TINInput'}
                    value={TINValue}
                    onChange={handleTINChange}
                    placeholder={'10 цифр'}
                    errorMessage={!TINValid ? `${TINError}` : ''}
                    mask='9999-9999-99-(99)'
                    maskChar='_'
                />
                <FieldInput
                    type={'select'}
                    isRequired={true}
                    label={'Тональность'}
                    htmlFor={'scanField_tonalityInput'}
                    wrapperClassName={'search-input-wrapper'}
                    labelClassName={'search-input-field-label'}
                    inputClassName={'search-input-field-entry'}
                    id={'scanField_tonalityInput'}
                    name={'scanField_tonalityInput'}
                    options={[
                        {value: 'option1', label: 'Любая'},
                        {value: 'option2', label: 'Позитивная'},
                        {value: 'option3', label: 'Негативная'},
                    ]}
                    onChange={handleTonalityChange}
                    errorMessage={''}
                />
                <FieldInput
                    type={'number'}
                    isRequired={true}
                    label={'Количество документов в выдаче'}
                    htmlFor={'scanField_documentQuantityInput'}
                    wrapperClassName={'search-input-wrapper'}
                    labelClassName={'search-input-field-label'}
                    inputClassName={'search-input-field-entry'}
                    id={'scanField_documentQuantityInput'}
                    name={'scanField_documentQuantityInput'}
                    value={documentQuantityValue}
                    onChange={handleDocumentQuantityValueChange}
                    placeholder={'от 1 до 1000'}
                    errorMessage={''}
                />
                <FieldInput
                    type={'date'}
                    isRequired={true}
                    label={'Диапазон поиска'}
                    htmlFor={'scanField_dateRangeInput'}
                    wrapperClassName={'search-input-wrapper'}
                    labelClassName={'search-input-field-label'}
                    inputClassName={'search-input-field-entry'}
                    id={'scanField_dateRangeInput'}
                    name={'scanField_dateRangeInput'}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={setStartDate}
                    onChange_2={setEndDate}
                    errorMessage={''}
                />
            </div>
            <div className="scan-checkboxes-wrapper">
                <FieldInput
                    type={'checkbox'}
                    isRequired={false}
                    label={'Признак максимальной полноты'}
                    htmlFor={'scanField_maxCompletenessCheckbox'}
                    wrapperClassName={'search-checkbox-wrapper'}
                    labelClassName={'search-checkbox-label'}
                    inputClassName={'search-checkbox-entry'}
                    id={'scanField_maxCompletenessCheckbox'}
                    name={'scanField_maxCompletenessCheckbox'}
                    onChange={handleCheckboxChange}
                    checked={checkboxes['maxCompleteness_Checkbox']}
                />
                <FieldInput
                    type={'checkbox'}
                    isRequired={false}
                    label={'Упоминания в бизнес-контексте'}
                    htmlFor={'scanField_businessContextCheckbox'}
                    wrapperClassName={'search-checkbox-wrapper'}
                    labelClassName={'search-checkbox-label'}
                    inputClassName={'search-checkbox-entry'}
                    id={'scanField_businessContextCheckbox'}
                    name={'scanField_businessContextCheckbox'}
                    onChange={handleCheckboxChange}
                    checked={checkboxes['businessContext_Checkbox']}
                />
                <FieldInput
                    type={'checkbox'}
                    isRequired={false}
                    label={'Главная роль в публикации'}
                    htmlFor={'scanField_mainRoleCheckbox'}
                    wrapperClassName={'search-checkbox-wrapper'}
                    labelClassName={'search-checkbox-label'}
                    inputClassName={'search-checkbox-entry'}
                    id={'scanField_mainRoleCheckbox'}
                    name={'scanField_mainRoleCheckbox'}
                    onChange={handleCheckboxChange}
                    checked={checkboxes['mainRole_Checkbox']}
                />
                <FieldInput
                    type={'checkbox'}
                    isRequired={false}
                    label={'Публикации только с риск-факторами'}
                    htmlFor={'scanField_riskFactorsOnlyCheckbox'}
                    wrapperClassName={'search-checkbox-wrapper'}
                    labelClassName={'search-checkbox-label'}
                    inputClassName={'search-checkbox-entry'}
                    id={'scanField_riskFactorsOnlyCheckbox'}
                    name={'scanField_riskFactorsOnlyCheckbox'}
                    onChange={handleCheckboxChange}
                    checked={checkboxes['riskFactorsOnly_Checkbox']}
                />
                <FieldInput
                    type={'checkbox'}
                    isRequired={false}
                    label={'Включать технические новости рынков'}
                    htmlFor={'scanField_includeTechMarketNewsCheckbox'}
                    wrapperClassName={'search-checkbox-wrapper'}
                    labelClassName={'search-checkbox-label'}
                    inputClassName={'search-checkbox-entry'}
                    id={'scanField_includeTechMarketNewsCheckbox'}
                    name={'scanField_includeTechMarketNewsCheckbox'}
                    onChange={handleCheckboxChange}
                    checked={checkboxes['includeTechMarketNews_Checkbox']}
                />
                <FieldInput
                    type={'checkbox'}
                    isRequired={false}
                    label={'Включать анонсы и календари'}
                    htmlFor={'scanField_includePreviewAndCalendarsCheckbox'}
                    wrapperClassName={'search-checkbox-wrapper'}
                    labelClassName={'search-checkbox-label'}
                    inputClassName={'search-checkbox-entry'}
                    id={'scanField_includePreviewAndCalendarsCheckbox'}
                    name={'scanField_includePreviewAndCalendarsCheckbox'}
                    onChange={handleCheckboxChange}
                    checked={checkboxes['includePreviewAndCalendars_Checkbox']}
                />
                <FieldInput
                    type={'checkbox'}
                    isRequired={false}
                    label={'Включать сводки новостей'}
                    htmlFor={'scanField_includeNewsSummaryCheckbox'}
                    wrapperClassName={'search-checkbox-wrapper'}
                    labelClassName={'search-checkbox-label'}
                    inputClassName={'search-checkbox-entry'}
                    id={'scanField_includeNewsSummaryCheckbox'}
                    name={'scanField_includeNewsSummaryCheckbox'}
                    onChange={handleCheckboxChange}
                    checked={checkboxes['includeNewsSummary_Checkbox']}
                />
            </div>
        <div className="scan-field-button-wrapper">
            <Button type={'submit'} backgroundColor='#5970FF' textColor='#fff' text='Поиск' />
            <p className="scan-field-additional-info">* Обязательные к заполнению поля</p>
        </div>
        </form>
    )
}

export default ScanField;