import React, { Component } from 'react';
import classes from './IssueBooks.css';

// import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';

import StudentBooks from '../../components/Student/StudentBooks/StudentBooks';
import StudentSearch from '../../components/Student/StudentSearch/StudentSearch';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { checkValidity } from '../../shared/utility';
import Spinner from '../../components/UI/Spinner/Spinner';

import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-library';

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
            bookId: {   
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Book ID'
                },
                validation: {
                    required: true,
                    minLength: 4
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
        loading: false,
        error: false
    }

    // componentDidMount() {
    //     axios.get('http://localhost:8080/student/reissue-request')
    //         .then(res => {
    //             res.data.result[0].books.forEach(book => {
    //                 let reissueDay = new Date(book.reIssueDate);
    //                 let today = new Date();
    //                 const diffTime = reissueDay.getTime() - today.getTime();
    //                 const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    //                 if(diffDays > 0) {
    //                     book.fine = diffDays
    //                 } else if(diffDays === 0) {
    //                     book.fine = 0;
    //                 } else {
    //                     book.fine = 0;
    //                 }
    //                 console.log(diffDays, book);
    //                 book.userId = this.props.userId;
    //                 axios.post('http://localhost:8080/student/book-fine', book)
    //                     .then(res => console.log(res))
    //                     .catch(err => console.log(err))
    //             });
    //         })
    //         .catch(err => console.log(err))
    // }

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
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.studentInfo) {
            console.log(formElementIdentifier, this.state.studentInfo[formElementIdentifier].valid);
            formData[formElementIdentifier] = this.state.studentInfo[formElementIdentifier].value
        }
        let date = formData.dateOfIssue;
        let today = new Date(date);
        let tomorrow = new Date(today.setMonth(today.getMonth() + 1));
        formData.dateOfIssue = tomorrow.toDateString();
        console.log('formData=', formData);

        axios.post('/book/students', formData)
            .then(result => {
                console.log('issuebooks result', result);
                let arr = [];
                result.data.student.books.map(book => {
                    console.log(book);
                    return arr.push(book);
                });

                const updatedStudentInfo = {
                    ...this.state.studentInfo,
                }

                const updatedInfoElement1 = {
                    ...updatedStudentInfo['name']
                } 
                updatedInfoElement1.value = '';
                updatedStudentInfo['name'] = updatedInfoElement1;

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

                const updatedInfoElement5 = {
                    ...updatedStudentInfo['bookId']
                } 
                updatedInfoElement5.value = '';
                updatedStudentInfo['bookId'] = updatedInfoElement4;

                const updatedInfoElement6 = {
                    ...updatedStudentInfo['dateOfIssue']
                } 
                updatedInfoElement6.value = '';
                updatedStudentInfo['dateOfIssue'] = updatedInfoElement6;

                this.setState({studentInfo: updatedStudentInfo, studentBooks: arr});
                this.setState({loading: false});
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false});
            });
    }

    // result.data.studentInfo.books.map(book => {
                    
    //     return book.fine;
    // })
    searchSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const searchObj = {
            "search": this.state.searchData.value.toLowerCase()
        }
        console.log(searchObj);
        let config = {
            headers: {'Authorization': "Bearer " + this.props.token}
        };
        axios.post('/book/search', searchObj, config)
            .then(result => {
                console.log("search result", result);

                const updatedStudentInfo = {
                    ...this.state.studentInfo,
                }

                const updatedInfoElement1 = {
                    ...updatedStudentInfo['name']
                } 
                updatedInfoElement1.value = result.data.studentInfo.name;
                updatedStudentInfo['name'] = updatedInfoElement1;
                
                const updatedInfoElement2 = {
                    ...updatedStudentInfo['roll']
                } 
                updatedInfoElement2.value = result.data.studentInfo.roll;
                updatedStudentInfo['roll'] = updatedInfoElement2;

                const updatedInfoElement3 = {
                    ...updatedStudentInfo['branch']
                } 
                updatedInfoElement3.value = result.data.studentInfo.branch;
                updatedStudentInfo['branch'] = updatedInfoElement3;

                const updatedInfoElement4 = {
                    ...updatedStudentInfo['semester']
                } 
                updatedInfoElement4.value = result.data.studentInfo.semester;
                updatedStudentInfo['semester'] = updatedInfoElement4;

                let arr = [];
                result.data.studentInfo.books.map(book => {
                    console.log('searchhandler', book);
                    return arr.push(book);
                });
                
                const updatedSearchData = {
                    ...this.state.searchData
                }
                updatedSearchData.value = '';

                this.setState({studentInfo: updatedStudentInfo, studentBooks: arr, searchData: updatedSearchData});
                this.setState({loading: false});


                axios.get('http://localhost:8080/student/reissue-request')
                .then(res => {
                    console.log('get back data', res.data.result[0].books)
                    res.data.result[0].books.forEach(async book => {
                        let reissueDay = new Date(book.reIssueDate);
                        let today = new Date();
                        const diffTime = today.getTime() - reissueDay.getTime();
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                        if(diffDays > 0) {
                            book.fine = Math.abs(diffDays)
                        } else if(diffDays === 0) {
                            book.fine = 0;
                        } else {
                            book.fine = 0;
                        }
                        book.roll = result.data.studentInfo.roll;
                        console.log('book 12', book);
                        const data = await axios.post('http://localhost:8080/student/book-fine', book)
                        console.log(data);
                    })
                })
                .catch(err => console.log(err));

            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false, error: true})
            });
    }


    render() {
        let formElementArray = [];
        let studentBooks;
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

        if (this.state.loading) {
            studentBooks = <Spinner />
        } else {
            studentBooks = <StudentBooks books={this.state.studentBooks} roll={this.state.studentInfo.roll} />;
        }

        return( 
            <Aux>
                <StudentSearch searchStudentHandler={this.searchSubmitHandler} 
                            value={this.state.searchData.value} 
                            changed={(event) => this.searchInputChangedHandler(event)}
                            invalid={!this.state.searchData.valid} 
                            touched={this.state.searchData.touched} 
                            disabled={!this.state.formIsValid} 
                            label="Enter student roll no." />

                <div className={classes.IssueBooks}>
                    <h4>Issue the book</h4>
                    {form}
                </div>

                <div className={classes.IssueBooks}>
                    {studentBooks}
                </div>
                
            </Aux>
            );
    }
}

export default WithErrorHandler(IssueBooks, axios);