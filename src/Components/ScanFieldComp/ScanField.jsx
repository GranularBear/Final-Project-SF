import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../../AuthContext";


import FieldInput from "../FieldInputComp/FieldInput";
import Button from '../ButtonComp/Button';

import './ScanField.scss';

const ScanField = (props) => {
    const { setLoadingHistogram, setHistogramData, isScanAttempted, setIsScanAttempted, setDocumentIDs, loadDocuments, visibleDocuments }  = useAuth();

    const [TINValue, setTINValue] = useState(null);
    const [documentQuantityValue, setDocumentQuantityValue] = useState(null);
    const [tonality, setTonality] = useState("any");
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
    const [documentQuantityError, setDocumentQuantityError] = useState('');

    const [datesValid, setDatesValid] = useState(true);
    const [datesError, setDatesError] = useState('');

    useEffect(() => {
        if (isScanAttempted) {
            if(TINValid) {
                console.log('Submitted');
            } else {
                console.log(`Not Submitted: ${TINError}`)
            }
        }
    }, [TINValid, TINError, isScanAttempted]);

    const handleTINChange = (event) => {
        let value = event.target.value.replace(/[_()\-]+/g,'');
        setTINValue(value);
    }

    const handleDocumentQuantityValueChange = (event) => {
        setDocumentQuantityValue(event.target.value);
    }

    const handleTonalityChange = (option) => {

        if (option.label === 'Любая') {
            setTonality("any");
        } else if (option.label === 'Позитивная') {
            setTonality("positive")
        } else if (option.label === 'Негативная') {
            setTonality("negative")
        }
    }

    const handleCheckboxChange = (event) => {
        setCheckboxes({...checkboxes, [event.target.id]: event.target.checked})
    };

    const validateTIN = (TIN) => {
        let result = false;

        if (TINValue === null || !TINValue.length) {
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

    const validateDocumentQuantity = (documentQuantity) => {
        let result = false;

        if (documentQuantity === undefined || documentQuantity === null || documentQuantity.toString().length === 0) {
            setDocumentQuantityError('Обязательное поле')
            return result;
        } else if (documentQuantity < 1 || documentQuantity > 1000) {
            setDocumentQuantityError('Число вне диапозона')
            return result;
        } else {
            result = true;
            return result;
        }
    }

    const validateDates = (firstDate, lastDate) => {
        let result = false;
        let currentDate = new Date();

        currentDate.setHours(0,0,0,0);

        if (!firstDate || !lastDate) {
            setDatesError('Укажите необходимые даты');
            return result;
        } else {
            firstDate.setHours(0,0,0,0);
            lastDate.setHours(0,0,0,0);

            if (firstDate > lastDate) {
                setDatesError('Дата начала не может быть позднее даты конца');
                return result;
            } else if (firstDate > currentDate) {
                setDatesError('Дата начала не может быть позднее текущей даты');
                return result;
            } else if (lastDate> currentDate) {
                setDatesError('Дата конца не может быть позднее текущей даты');
                return result;
            } else {
                result = true;
                return result;
            }
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setTINValid(validateTIN(TINValue));
        setDocumentQuantityValid(validateDocumentQuantity(documentQuantityValue));
        setDatesValid(validateDates(startDate, endDate));

        if (TINValid && TINValue !== null && documentQuantityValid && documentQuantityValue !== null && datesValid && startDate !== null && endDate !== null) {
            setLoadingHistogram(true);
            setIsScanAttempted(true);

            const payload = {
                "issueDateInterval": {
                    "startDate": startDate.toISOString(),
                    "endDate": endDate.toISOString()
                },
                "searchContext": {
                    "targetSearchEntitiesContext": {
                        targetSearchEntities: [
                            {
                                "type": "company",
                                "sparkId": null,
                                "entityId": null,
                                "inn": TINValue,
                                "maxFullness": checkboxes['scanField_maxCompletenessCheckbox'],
                                "inBusinessNews": checkboxes['scanField_businessContextCheckbox']
                            }
                        ],
                        "onlyMainRole": checkboxes['scanField_mainRoleCheckbox'],
                        "tonality": tonality,
                        "onlyWithRiskFactors": checkboxes['scanField_RiskFactorsOnlyCheckbox'],
                        "riskFactors": {
                            "and": [],
                            "or": [],
                            "not": []
                        },
                        "themes": {
                            "and": [],
                            "or": [],
                            "not": []
                        }
                    },
                    "themesFilter": {
                        "and": [],
                        "or": [],
                        "not": []
                    }
                },
                "searchArea": {
                    "includedSources": [],
                    "excludedSources": [],
                    "includedSourceGroups": [],
                    "excludedSourceGroups": []
                },
                "similarMode": "duplicates",
                "limit": documentQuantityValue,
                "sortType": "issueDate",
                "sortDirectionType": "desc",
                "intervalType": "month",
                "histogramTypes": [
                    "totalDocuments",
                    "riskFactors"
                ],
                "attributeFilters": {
                    "excludeTechNews": checkboxes['scanField_includeTechMarketNewsCheckbox'],
                    "excludeAnnouncements": checkboxes['scanField_includePreviewAndCalendarsCheckbox'],
                    "excludeDigets": checkboxes['scanField_includeNewsSummaryCheckbox']
                }
            };

            const histogramResponse = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payload)
            });

            const histogramData = await histogramResponse.json();
            setHistogramData(histogramData);

            const documentIDsResponse = await fetch ('https://gateway.scan-interfax.ru/api/v1/objectsearch/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payload)
            });

            const documentIDs = await documentIDsResponse.json();
            setDocumentIDs(documentIDs.items);
            // loadDocuments();

            // console.log(visibleDocuments)

            setLoadingHistogram(false);
        }
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
                    inputClassName={`search-input-field-entry ${!documentQuantityValid ? 'scan-field_incorrect-input' : ''}`}
                    id={'scanField_documentQuantityInput'}
                    name={'scanField_documentQuantityInput'}
                    value={documentQuantityValue}
                    onChange={handleDocumentQuantityValueChange}
                    placeholder={'от 1 до 1000'}
                    errorMessage={!documentQuantityValid ? `${documentQuantityError}` : ''}
                />
                <FieldInput
                    type={'date'}
                    isRequired={true}
                    label={'Диапазон поиска'}
                    htmlFor={'scanField_dateRangeInput'}
                    wrapperClassName={'search-input-wrapper'}
                    labelClassName={'search-input-field-label'}
                    inputClassName={`search-input-field-entry ${!datesValid ? 'scan-field_incorrect-input' : ''}`}
                    id={'scanField_dateRangeInput'}
                    name={'scanField_dateRangeInput'}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={setStartDate}
                    onChange_2={setEndDate}
                    errorMessage={!datesValid ? `${datesError}` : ''}
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
            <Button type={'submit'} backgroundColor='#5970FF' textColor='#fff' text='Поиск' className={'scanField_submit-button'} />
            <p className="scan-field-additional-info">* Обязательные к заполнению поля</p>
        </div>
        </form>
    )
}

export default ScanField;