import React, { useState, useEffect, useRef } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select, { components } from 'react-select';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';

import CustomArrow from '../../Icons/gray-arrow_pointed-down-icon.jpg'

import './FieldInput.scss';

const FieldInput = ({ label, type, isRequired, wrapperClassName, labelClassName, inputClassName, placeholder, options, htmlFor, errorMessage, onChange, onChange_2, handleBlur, startDate, endDate,...otherProps }) => {
    const startDateInputRef = useRef(null);
    const endDateInputRef = useRef(null);

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isWideScreen, setIsWideScreen] = useState(screenWidth > 1920);
    const [isRegularScreen, setIsRegularScreen] = useState(screenWidth > 980 && screenWidth < 1920);
    const [isTablet, setIsTablet] = useState(screenWidth < 980);
    const [isMobile, setIsMobile] = useState(screenWidth < 768)

    useEffect(() => {
        const handleResize = () => {
            const newScreenWidth = window.innerWidth;
            const newIsWideScreen = newScreenWidth > 1920;
            const newIsRegularScreen = newScreenWidth > 980 && newScreenWidth < 1920;
            const newIsTablet = newScreenWidth < 980;
            const newIsMobile = newScreenWidth < 768;


            if (newIsWideScreen !== isWideScreen) {
                setScreenWidth(newScreenWidth);
                setIsWideScreen(newIsWideScreen);
            } else if (newIsRegularScreen !== isRegularScreen) {
                setScreenWidth(newScreenWidth);
                setIsRegularScreen(newIsRegularScreen);
            } else if (newIsTablet !== isTablet) {
                setScreenWidth(newScreenWidth);
                setIsTablet(newIsTablet);
            } else if (newIsMobile !== isMobile) {
                setScreenWidth(newScreenWidth);
                setIsMobile(newIsMobile);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }

    }, [isWideScreen, isRegularScreen, isTablet, isMobile]);

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <img src={CustomArrow} alt='dropdown arrow'/>
            </components.DropdownIndicator>
        );
    };

    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#fff',
            border: state.isFocused ? '2px solid black' : '1px solid #C7C7C7',
            '&:hover' : {
                borderColor: state.isFocused ? '2px solid black' : provided.borderColor
            },
            borderRadius: '5px',
            boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.05)',
            height: '2.7rem',
            padding: '0 15px',
            fontWeight: '400',
            lineHeight: '19px',
            letterSpacing: '0.02em',
            fontSize: isWideScreen ? '18px' : isRegularScreen ? '16px' : isTablet ? '14px' : '',
        }),

        valueContainer: (provided, state) => ({
            ...provided,
            padding: '0',
            textAlign: isMobile ? 'center' : 'left',
            paddingLeft: isMobile ? '36px' : '0px',
        }),

        indicatorsContainer: (provided, state) => ({
            ...provided,
            padding: '0',
            cursor: 'pointer'
        }),

        placeholder: (provided, state) => ({
            ...provided,
            textAlign: isMobile ? 'center' : 'left',
        })
    }

    return (
        type === 'checkbox'
        ?
        <div className={`field-wrapper checkbox-wrapper ${wrapperClassName}`}>
            <input
                className={`field-input checkbox-input ${inputClassName}`}
                type="checkbox"
                onChange={onChange}
                {...otherProps}
            />
            <label
                className={`field-label checkbox-label ${labelClassName}`}
                htmlFor={htmlFor}
            >
                {label}
            </label>
        </div>
        :
        <div className={`field-wrapper ${type + '-wrapper'} ${wrapperClassName}`}>
            <label
                className={`field-label ${type + '-label'} ${labelClassName}`}
                htmlFor={htmlFor}
            >
                {label}{isRequired && <span className={`asterix ${errorMessage !== '' ? 'required_not-filled' : ''}`}> *</span>}
            </label>
            {
                type === "select"
                ?
                    <div className="select-input-container">
                        <Select
                            isSearchable={false}
                            className={` ${inputClassName}`}
                            options={options}
                            styles={customSelectStyles}
                            components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                            placeholder={'Выберите тональность'}
                            onChange={onChange}
                            {...otherProps}
                        >
                        </Select>
                    </div>
                :
                type === 'date'
                ?
                    <div className="date-range-picker">
                        <div className="date-picker-container">
                            <DatePicker
                                ref={startDateInputRef}
                                className={`field-input date-picker ${inputClassName}`}
                                selectsStart
                                selected={startDate}
                                placeholderText={'Дата начала'}
                                dateFormat='dd/MM/yyyy'
                                customInput={
                                    <InputMask mask='99/99/9999' onBlur={handleBlur}>
                                        {(inputProps) => <input {...inputProps} />}
                                    </InputMask>
                                }
                                onChange={onChange}
                                {...otherProps}
                            />
                            <div className="dropdown-arrow" onClick={() => startDateInputRef.current.setFocus()}></div>
                        </div>
                        <div className="date-picker-container">
                            <DatePicker
                                ref={endDateInputRef}
                                className={`field-input date-picker ${inputClassName}`}
                                selectsEnd
                                selected={endDate}
                                placeholderText={'Дата конца'}
                                dateFormat='dd/MM/yyyy'
                                customInput={
                                    <InputMask mask='99/99/9999' onBlur={handleBlur}>
                                        {(inputProps) => <input {...inputProps} />}
                                    </InputMask>
                                }
                                onChange={onChange_2}
                                {...otherProps}
                            />
                            <div className="dropdown-arrow" onClick={() => endDateInputRef.current.setFocus()}></div>
                        </div>
                    </div>
                :
                otherProps.mask
                ?
                    <InputMask
                        className={`field-input ${type + '-input'} ${inputClassName}`}
                        mask={otherProps.mask}
                        placeholder={placeholder}
                        onChange={onChange}
                        {...otherProps}
                    />
                :    
                    <input
                        className={`field-input ${type + '-input'} ${inputClassName}`}
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                        {...otherProps}
                    />
            }
                <p className="input-error-message">{errorMessage}</p>
        </div>
    )
}

FieldInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'email', 'password', 'select', 'checkbox', 'number', 'date']),
    isRequired: PropTypes.bool,
    wrapperClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })),
    htmlFor: PropTypes.string,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func,
    onChange_2: PropTypes.func,
    handleBlur: PropTypes.func,
};

FieldInput.defaultProps = {
    isRequired: false,
    options: [],
}

export default FieldInput;