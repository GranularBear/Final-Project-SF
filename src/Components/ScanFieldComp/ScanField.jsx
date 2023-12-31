import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parse, isValid } from 'date-fns';
import { useAuth } from "../../AuthContext";

import { validateTIN, validateDocumentQuantity, validateDates } from "./Helpers";

import FieldInput from "../FieldInputComp/FieldInput";
import Button from '../ButtonComp/Button';

import './ScanField.scss';

const ScanField = (props) => {
    const navigate = useNavigate();
    const { setLoadingHistogram, setHistogramData, setIsScanAttempted, setDocumentIDs, setIsLoggedIn }  = useAuth();

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

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleTINChange = (event) => {
        let value = event.target.value.replace(/[_()-]+/g,'');
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

    const validateDateInputsOnBlur = (startDate, endDate) => {
        const parsedStartDate = parse(startDate, "dd/MM/yyyy", new Date());
        const parsedEndDate = parse(endDate, "dd/MM/yyyy", new Date())

        if (!isValid(parsedStartDate)) {
            setStartDate(null);
        } else if (!isValid(parsedEndDate)) {
            setEndDate(null);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const { TINValid, TINError } = validateTIN(TINValue);
        setTINValid(TINValid);
        setTINError(TINError);

        const { DocumentQuantityValid, DocumentQuantityError } = validateDocumentQuantity(documentQuantityValue);
        setDocumentQuantityValid(DocumentQuantityValid);
        setDocumentQuantityError(DocumentQuantityError);

        const { DatesValid, DatesError } = validateDates(startDate, endDate);
        setDatesValid(DatesValid);
        setDatesError(DatesError);

        setFormSubmitted(true);

    }

    useEffect(() => {
        const submitForm = async() => {
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
    
                if (histogramResponse.status === 200) {
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
                    setLoadingHistogram(false);
                } else if (histogramResponse.status === 401) {
                    navigate('/authorization');
                    setIsLoggedIn(false);
                    alert('Время сессии истекло. Пожалуйста, пройдите авторизацию')
                } else {
                    console.error('Failed to fetch the data')
                }
            }
        }

        if (formSubmitted) {
            submitForm();
            setFormSubmitted(false);     
        }
    }, [formSubmitted, TINValue, TINValid, startDate, endDate, datesValid, documentQuantityValue, documentQuantityValid, checkboxes, navigate, setDocumentIDs, setHistogramData, setIsLoggedIn, setIsScanAttempted, setLoadingHistogram, tonality])

    return (
        <form className="scan-field_container" onSubmit={handleSubmit}>
            <div className="scan-field_obligatory-scan-inputs-wrapper">
                <FieldInput
                    type={'text'}
                    isRequired={true}
                    label={'ИНН компании'}
                    htmlFor={'scanField_TINInput'}
                    wrapperClassName={'scan-field_scan-input_wrapper'}
                    labelClassName={'scan-field_scan-input_label'}
                    inputClassName={`scan-field_scan-input_entry ${!TINValid ? 'scan-field_incorrect-input' : ''} `}
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
                    wrapperClassName={'scan-field_scan-input_wrapper'}
                    labelClassName={'scan-field_scan-input_label'}
                    inputClassName={'scan-field_scan-input_entry'}
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
                    wrapperClassName={'scan-field_scan-input_wrapper'}
                    labelClassName={'scan-field_scan-input_label'}
                    inputClassName={`scan-field_scan-input_entry ${!documentQuantityValid ? 'scan-field_incorrect-input' : ''}`}
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
                    wrapperClassName={'scan-field_scan-input_wrapper'}
                    labelClassName={'scan-field_scan-input_label'}
                    inputClassName={`scan-field_scan-input_entry ${!datesValid ? 'scan-field_incorrect-input' : ''}`}
                    id={'scanField_dateRangeInput'}
                    name={'scanField_dateRangeInput'}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={setStartDate}
                    onChange_2={setEndDate}
                    handleBlur={validateDateInputsOnBlur}
                    errorMessage={!datesValid ? `${datesError}` : ''}
                />
            </div>
            <div className="scan-field_checkboxes-wrapper">
                <FieldInput
                    type={'checkbox'}
                    isRequired={false}
                    label={'Признак максимальной полноты'}
                    htmlFor={'scanField_maxCompletenessCheckbox'}
                    wrapperClassName={'scan-field_checkbox-wrapper'}
                    labelClassName={'scan-field_checkbox-label'}
                    inputClassName={'scan-field_checkbox-entry'}
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
                    wrapperClassName={'scan-field_checkbox-wrapper'}
                    labelClassName={'scan-field_checkbox-label'}
                    inputClassName={'scan-field_checkbox-entry'}
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
                    wrapperClassName={'scan-field_checkbox-wrapper'}
                    labelClassName={'scan-field_checkbox-label'}
                    inputClassName={'scan-field_checkbox-entry'}
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
                    wrapperClassName={'scan-field_checkbox-wrapper'}
                    labelClassName={'scan-field_checkbox-label'}
                    inputClassName={'scan-field_checkbox-entry'}
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
                    wrapperClassName={'scan-field_checkbox-wrapper'}
                    labelClassName={'scan-field_checkbox-label'}
                    inputClassName={'scan-field_checkbox-entry'}
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
                    wrapperClassName={'scan-field_checkbox-wrapper'}
                    labelClassName={'scan-field_checkbox-label'}
                    inputClassName={'scan-field_checkbox-entry'}
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
                    wrapperClassName={'scan-field_checkbox-wrapper'}
                    labelClassName={'scan-field_checkbox-label'}
                    inputClassName={'scan-field_checkbox-entry'}
                    id={'scanField_includeNewsSummaryCheckbox'}
                    name={'scanField_includeNewsSummaryCheckbox'}
                    onChange={handleCheckboxChange}
                    checked={checkboxes['includeNewsSummary_Checkbox']}
                />
            </div>
        <div className="scan-field_button-wrapper">
            <Button type={'submit'} backgroundColor='#5970FF' textColor='#fff' text='Поиск' className={'scan-field_submit-button'} />
            <p className="scan-field_additional-info">* Обязательные к заполнению поля</p>
        </div>
        </form>
    )
}

export default ScanField;