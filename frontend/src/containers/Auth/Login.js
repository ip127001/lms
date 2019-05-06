import React, { Component } from 'react';

import classes from './Login.css'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { checkValidity } from '../../shared/utility';

import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-library';

class Login extends Component {
    state = {
        loginForm: {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        loading: false,
        formIsValid: false
    }

    formInputHandler = (event, inputIdentifier) => {
        const updatedLoginForm = {
            ...this.state.loginForm,
        }
        const updatedInfoElement = {
            ...updatedLoginForm[inputIdentifier]
        } 
        updatedInfoElement.value = event.target.value;
        updatedInfoElement.valid = checkValidity(updatedInfoElement.value, updatedInfoElement.validation);
        updatedInfoElement.touched = true;
        updatedLoginForm[inputIdentifier] = updatedInfoElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({loginForm: updatedLoginForm, formIsValid: formIsValid});
    }

    render() {
        let formElementArray = [];
        for(let key in this.state.loginForm) {
            formElementArray.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }

        let form = (
            <form onSubmit={event => this.props.onLogin(event, {
                email: this.state.loginForm.email.value,
                password: this.state.loginForm.password.value
            })}>
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
            <div className={classes.Login}>
                <h4>Login</h4>
                {form}
            </div>
        )
    }
}

export default WithErrorHandler(Login, axios);