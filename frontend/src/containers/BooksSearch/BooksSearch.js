import React, { Component } from 'react';

import classes from './BooksSearch.css';

import Aux from '../../hoc/Aux/Aux';

import StudentSearch from '../../components/Student/StudentSearch/StudentSearch';

import { checkValidity } from '../../shared/utility';
import Spinner from '../../components/UI/Spinner/Spinner';

import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-library';

class BooksSearch extends Component {
    state = {
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


    searchInputChangedHandler = (event) => {
        const updatedSearchData = {
            ...this.state.searchData
        }
        updatedSearchData.value = event.target.value;
        updatedSearchData.valid = checkValidity(updatedSearchData.value, updatedSearchData.validation);
        updatedSearchData.touched = true;
        this.setState({searchData: updatedSearchData});
    }

    searchSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const searchObj = {
            "search": this.state.searchData.value.toLowerCase()
        }
        console.log(searchObj);

        axios.post('/book/search', searchObj)
            .then(result => {
                console.log("search result", result);

                let arr = [];
                result.data.studentInfo.books.map(book => {
                    console.log(book);
                    return arr.push(book);
                });
                
                const updatedSearchData = {
                    ...this.state.searchData
                }
                updatedSearchData.value = '';

                this.setState({studentBooks: arr, searchData: updatedSearchData});
                this.setState({loading: false});
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false})
            });
    }

    render() {

        return( 
            <Aux>
                <StudentSearch searchStudentHandler={this.searchSubmitHandler} 
                            value={this.state.searchData.value} 
                            changed={(event) => this.searchInputChangedHandler(event)}
                            invalid={!this.state.searchData.valid} 
                            touched={this.state.searchData.touched} 
                            disabled={!this.state.formIsValid} />

                
            </Aux>
            );
    }
}

export default WithErrorHandler(BooksSearch, axios);