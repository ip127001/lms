import React from 'react';

import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    let validationError = null;
    let label = null;
    const inputClasses = [classes.InputElement]

    if (props.touched && props.invalid && props.shouldValidate) {
        inputClasses.push(classes.Invalid);
        if (!props.shouldValidate.minLength) {
            validationError = <p className={classes.ValidationError}>
                            Enter a valid <strong>{props.label}</strong> with 
                            maxLength of {props.shouldValidate.maxLength}
                        </p>;
        } else {
            validationError = <p className={classes.ValidationError}>
                            Enter a valid <strong>{props.label}</strong> with 
                            minLength of {props.shouldValidate.minLength}
        </p>;
        } 
    }

    switch(props.elementType) {
        case('input'): 
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value} 
                                onChange={props.changed} />;
            break;
        case('textarea'):
            inputElement = <textarea 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value} 
                                onChange={props.changed} />;
            break;
        case('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed} >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value} />
    }

    if (props.label === 'dateOfIssue') {
        label = 'Date of Issue';
    } else {
        label = props.label.charAt(0).toUpperCase() + props.label.slice(1);
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default Input;