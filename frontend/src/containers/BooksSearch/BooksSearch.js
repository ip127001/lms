import React, { Component } from 'react';

import classes from './BooksSearch.css';

import StudentSearch from '../../components/Student/StudentSearch/StudentSearch';
import Book from '../../components/Book/Book/Book';

import { checkValidity } from '../../shared/utility';
// import Spinner from '../../components/UI/Spinner/Spinner';

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
        filter: 'tag',
        books: [],
        clickedBook: false,
        idBook: null,
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

    selectChangedHandler = (event) => {
        const filter = event.target.value;
        this.setState({filter: filter});
    }


    searchSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const searchObj = {
            "search": this.state.searchData.value.toLowerCase(),
            "filter": this.state.filter
        }
        console.log(searchObj);

        axios.post('/book/books', searchObj)
            .then(result => {
                this.setState({loading: true});
                console.log("search result", result);

                let arr = [];
                result.data.books.map(book => {
                    return arr.push(book);
                });
                
                this.setState({books: arr});
                this.setState({loading: false});
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false})
            });
    }

    selectedBookHandler = (id) => {
        console.log(id);
        let click = !this.state.clickedBook;
        this.setState({clickedBook: click, idBook: id});
    }

    render() {
        let books = null;
        books = this.state.books.map(book => {
            return <Book    
                        bookInfo={book} 
                        key={book.id} 
                        click={this.state.clickedBook} 
                        idBook={this.state.idBook}
                        clicked={this.selectedBookHandler.bind(this, book.id)}/>
        })

        return( 
            <div className={classes.BooksSearch}>
                <StudentSearch searchStudentHandler={this.searchSubmitHandler} 
                        value={this.state.searchData.value} 
                        changed={(event) => this.searchInputChangedHandler(event)}
                        invalid={!this.state.searchData.valid} 
                        touched={this.state.searchData.touched}
                        label="Enter Book Keyword" 
                        select
                        selectChanged={(event) => this.selectChangedHandler(event)}
                        />
            
            <div style={{textAlign: "center"}}>
                Available books in the library
            </div>

            {books}

            </div>
        );
    }
}

export default WithErrorHandler(BooksSearch, axios);