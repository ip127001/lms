import React, { Component } from 'react';

import classes from './studentBooks.css';
import Button from '../../UI/Button/Button';
import axios from '../../../axios-library';

class studentBooks extends Component {
    state = {
        books: []
    }
    componentDidMount() {
        if(this.props.books.length > 0) {
            this.setState({books: this.props.books.map(book => book.bookId)})
        }
    }
    returnHandler = (bookId) => {
        const postData = {
            roll: this.props.roll.value,
            bookId: bookId
        }
        axios.post('http://localhost:8080/student/return-book', postData)
            .then(res => {
                console.log(res.data.student.books);
                if(res.data.student.books.length > 0) {
                    const newBooks = res.data.student.books.map(bk => bk.bookId);
                    this.setState({books: newBooks})
                } else {
                    this.setState({books: []});
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        let tableContent;
        if(this.props.books.length > 0) {
            tableContent = this.props.books.map(book => {
                const row = (
                    <tr key={book.bookId}>
                        <td>{book.bookName}</td>
                        <td>{book.bookId}</td>
                        <td>{book.fine}</td>
                        <td>{book.reIssueDate}</td>
                        <td><Button btnType="Success" clicked={() => this.returnHandler(book.bookId)}>Return</Button></td>
                    </tr>
                );
                let rtnElement = this.state.books.includes(book.bookId) ? row : null; 
                return rtnElement;
            });
        } else {
            tableContent = (
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        }
        return (
            <div>
                <h6 style={{textAlign: "center"}}> here are the books and associated fine</h6>
                <table className={classes.Customers}>
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Book ID</th>
                            <th>Fine</th>
                            <th>Date of ReIssue</th>
                            <th>Reissue/Return</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default studentBooks;