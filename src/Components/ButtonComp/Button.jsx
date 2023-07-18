import React from "react";
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ type, className, textColor, backgroundColor, onClick, text, ...otherProps}) => {
    return (
        <button
            type={type}
            className={`button-default-style ${className}`}
            style={{ backgroundColor: backgroundColor, color: textColor }}
            onClick={onClick}
            {...otherProps}
        >
            {text}
        </button>
    )
}

Button.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    textColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string,
}

Button.defaultProps = {
    type: 'button',
}

export default Button;