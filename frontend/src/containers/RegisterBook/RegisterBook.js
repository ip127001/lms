import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import classes from './RegisterBook.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { checkValidity } from '../../shared/utility';

import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-library';

class StudentInfo extends Component {
    state = {
        bookForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Book Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            idBook: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Book ID'
                },
                value: '',
                validation: {
                    required: true,
                    isNumber: true
                },
                valid: false,
                touched: false
            },
            author: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Author name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            subject: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'subject of book'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            fine: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'fine associated with book'
                },
                value: 0,
                validation: {
                    required: true,
                    isNumber: true
                },
                valid: false,
                touched: false
            },
            tag: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'tag of book'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        loading: false,
        formIsValid: false,
        redirect: false
    }

    formInputHandler = (event, inputIdentifier) => {
        const updatedBookForm = {
            ...this.state.bookForm,
        }
        const updatedInfoElement = {
            ...updatedBookForm[inputIdentifier]
        } 
        updatedInfoElement.value = event.target.value;
        updatedInfoElement.valid = checkValidity(updatedInfoElement.value, updatedInfoElement.validation);
        updatedInfoElement.touched = true;
        updatedBookForm[inputIdentifier] = updatedInfoElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedBookForm) {
            formIsValid = updatedBookForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({bookForm: updatedBookForm, formIsValid: formIsValid});
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.bookForm) {
            formData[formElementIdentifier] = this.state.bookForm[formElementIdentifier].value
        }

        axios.post('/book/newBook', formData)
            .then(result => {
                console.log("result", result);
                this.setState({loading: false, redirect: true});
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false});
            });
    }


    render() {
        let formElementArray = [];
        for(let key in this.state.bookForm) {
            formElementArray.push({
                id: key,
                config: this.state.bookForm[key]
            })
        }

        let form = (
            <form onSubmit={this.formSubmitHandler}>
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
        let redirectPath = null;
        if (this.state.redirect) {
            redirectPath = <Redirect to='/' />
        }
        return (
            <div className={classes.Student}>
                {redirectPath}
                <h4>Register the book in the Library</h4>
                {form}
            </div>
        );  
    }
}

export default WithErrorHandler(StudentInfo, axios);