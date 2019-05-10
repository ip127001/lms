import React, { Component } from 'react';

import classes from './CreateStudent.css'

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { checkValidity } from '../../../shared/utility';

import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../../axios-library';

class CreateStudent extends Component {
    state = {
        signupForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            roll: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'student roll number'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'text'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4
                },
                valid: false,
                touched: false
            }
        },
        loading: false,
        formIsValid: false
    }

    formInputHandler = (event, inputIdentifier) => {
        const updatedSignupForm = {
            ...this.state.signupForm,
        }
        const updatedInfoElement = {
            ...updatedSignupForm[inputIdentifier]
        } 
        updatedInfoElement.value = event.target.value;
        updatedInfoElement.valid = checkValidity(updatedInfoElement.value, updatedInfoElement.validation);
        updatedInfoElement.touched = true;
        updatedSignupForm[inputIdentifier] = updatedInfoElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedSignupForm) {
            formIsValid = updatedSignupForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({signupForm: updatedSignupForm, formIsValid: formIsValid});
    }

    render() {
        let formElementArray = [];
        for(let key in this.state.signupForm) {
            formElementArray.push({
                id: key,
                config: this.state.signupForm[key]
            })
        }

        let form = (
            <form onSubmit={event => this.props.onSignup(event, this.state)}>
                {formElementArray.map(formElement => {
                    return <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid} 
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        label={formElement.id}
                        changed={(event) => this.formInputHandler(event, formElement.id)} />
                })}
                <Button>Submit</Button>
            </form>
        )
        return (
            <div className={classes.CreateStudent}>
                <h4>Create student data</h4>
                {form}
            </div>
        )
    }
}

export default WithErrorHandler(CreateStudent, axios);