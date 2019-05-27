import React, { Component } from 'react';
import classes from '../../IssueBooks/IssueBooks.css';

// import Modal from '../../components/UI/Modal/Modal';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { checkValidity } from '../../../shared/utility';

import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../../axios-library';

class IssueBooks extends Component {
    state = {
        studentInfo: {
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
            }
        },
        formIsValid: false,
        loading: false,
        error: false
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


    formSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.studentInfo) {
            console.log(formElementIdentifier, this.state.studentInfo[formElementIdentifier].valid);
            formData[formElementIdentifier] = this.state.studentInfo[formElementIdentifier].value
        }
        formData.userId = this.props.userId;
        console.log(formData)

        axios.post('/student/register', formData)
            .then(result => {
                const updatedStudentInfo = {
                    ...this.state.studentInfo,
                }
                
                const updatedInfoElement2 = {
                    ...updatedStudentInfo['roll']
                } 
                updatedInfoElement2.value = '';
                updatedStudentInfo['roll'] = updatedInfoElement2;

                const updatedInfoElement3 = {
                    ...updatedStudentInfo['branch']
                } 
                updatedInfoElement3.value = '';
                updatedStudentInfo['branch'] = updatedInfoElement3;

                const updatedInfoElement4 = {
                    ...updatedStudentInfo['semester']
                } 
                updatedInfoElement4.value = '';
                updatedStudentInfo['semester'] = updatedInfoElement4;

                this.setState({studentInfo: updatedStudentInfo});
                this.setState({loading: false});
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false});
            });
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
                <Button>Submit</Button>
            </form>
        )

        return( 
                <div className={classes.Profile}>
                    <h4>Register yourself</h4>
                    {form}
                </div>
            );
    }
}

export default WithErrorHandler(IssueBooks, axios);