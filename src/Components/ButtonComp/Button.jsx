import React from "react";

import './Button.scss';

const Button = (props) => {
    return (
        <button className="button" style={{ backgroundColor: props.color, color: props.textColor  }}>{props.text}</button>
    )
}

export default Button;