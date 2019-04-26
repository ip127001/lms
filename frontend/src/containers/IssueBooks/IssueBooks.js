import React, { Component } from 'react';
import classes from './IssueBooks.css';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';

import StudentBooks from '../../components/Student/StudentBooks/StudentBooks';
import StudentSearch from '../../components/Student/StudentSearch/StudentSearch';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { checkValidity } from '../../shared/utility';

import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-issue';

class IssueBooks extends Component {
    state = {
        studentInfo: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your mail'
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            roll: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Roll No'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            semester: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Current Semester in Number'
                },
                validation: {
                    required: true,
                    isNumeric: true,
                    maxLength: 1
                },
                valid: false,
                touched: false,
                value: ''
            },
            branch: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'cse', displayValue: 'CSE'},
                        {value: 'ece', displayValue: 'ECE'},
                        {value: 'eee', displayValue: 'EEE'},
                        {value: 'me', displayValue: 'ME'},
                        {value: 'ce', displayValue: 'CE'}
                    ]
                },
                value: 'cse',
                valid: true
            },
            bookId: {   
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Book ID'
                },
                validation: {
                    required: true,
                    isEmail: true,
                    isNumeric: true,
                    minLength: 4,
                    maxLength: 6
                },
                valid: false,
                touched: false,
                value: ''
            },
            dateOfIssue: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Date of Issue'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            }
        },
        searchData: {
            validation: {
                required: true
            },
            valid: false,
            touched: false,           
            value: ''
        },
        studentBooks: [],
        formIsValid: false,
        loading: false
    }

    IssueHandler = () => {
        this.setState({issuing: true})
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedStudentInfo = {
            ...this.state.studentInfo,
        }
        const updatedInfoElement = {
            ...updatedStudentInfo[inputIdentifier]
        } 
        updatedInfoElement.value = event.target.value;
        updatedInfoElement.valid = checkValidity(updatedInfoElement.value, updatedInfoElement.validation);
        updatedInfoElement.touched = true;
        updatedStudentInfo[inputIdentifier] = updatedInfoElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedStudentInfo) {
            formIsValid = updatedStudentInfo[inputIdentifier].valid && formIsValid;
        }

        this.setState({studentInfo: updatedStudentInfo, formIsValid: formIsValid});
    }

    searchInputChangedHandler = (event) => {
        const updatedSearchData = {
            ...this.state.searchData
        }
        updatedSearchData.value = event.target.value;
        updatedSearchData.valid = checkValidity(updatedSearchData.value, updatedSearchData.validation);
        updatedSearchData.touched = true;
        this.setState({searchData: updatedSearchData});
        console.log(event.target.value);
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.studentInfo) {
            formData[formElementIdentifier] = this.state.studentInfo[formElementIdentifier].value
        }
        console.log('formData=', formData);
        axios.post('/', formData)
            .then()
            .catch();
    }

    searchSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const search = this.state.searchData.value.toUpperCase();
        axios.post('/', search)
            .then()
            .catch();
    }

    render() {
        let formElementArray = [];

        for(let key in this.state.studentInfo) {
            formElementArray.push({
                id: key,
                config: this.state.studentInfo[key]
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
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                })}

                <div>
                    <Button disabled={!this.state.formIsValid}>Submit</Button>
                </div>

            </form>
        )
        return( 
            <Aux>
                
                    <StudentSearch searchStudentHandler={this.searchSubmitHandler} 
                                value={this.state.searchData.value} 
                                changed={(event) => this.searchInputChangedHandler(event)}
                                invalid={!this.state.searchData.valid} 
                                touched={this.state.searchData.touched} 
                                disabled={!this.state.formIsValid} />
                
                
                <div className={classes.IssueBooks}>
                    <h4>Issue the book</h4>
                    {form}
                </div>

                <div className={classes.IssueBooks}>
                    <StudentBooks books={this.state.books} />
                </div>
                
                {/* <Modal show={this.state.issuing} modalClosed={this.IssueCancelHandler}>
                    <StudentSummary issueSuccessHandler={this.IssueSuccessHandler} issueCancelHandler={this.IssueCancelHandler}/>
                </Modal> */}
            </Aux>
            );
    }
}

export default WithErrorHandler(IssueBooks, axios);