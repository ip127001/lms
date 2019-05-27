import React, { Component } from 'react';

import classes from './Login.css'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { checkValidity } from '../../shared/utility';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        formIsValid: false,
        isVerified: false,
        message: null,
        errorMessage: null
    }

    componentDidMount() {
        if(this.props.match.params.token) {
            console.log(this.props.match.params.token);
            this.setState({loading: true});
            const token = this.props.match.params.token;
            axios.post('http://localhost:8080/auth/token', {token: token})
                .then(result => {
                    console.log('result', result);
                    this.setState({isVerified: true, loading: false, message: result.data.message});
                })
                .catch(err => {
                    console.log(err.message);
                    this.setState({isVerified: false, loading: false});
                })
        } else {
            this.setState({isVerified: false, message: 'do login'})
        }
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
        // let errorMsg = <p style={{border: "1px solid red", borderRadius: '4px', padding: "10px", color: "red", width: "50%", margin: "5px auto"}}> {this.props.error}</p>
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
                {this.state.message}<br></br>
                {this.state.isVerified}
                <h4>Login</h4>
                {this.state.loading ? <Spinner /> : form}
            </div>
        )
    }
}

export default WithErrorHandler(Login, axios);