import React, { Component } from 'react';

import classes from './StudentProfile.css';

import Button from '../../components/UI/Button/Button';
import axios from '../../axios-library';

class StudentProfile extends Component {
    state = {
        issuedBooks: [],
        sent: false,
        bookID: []
    }

    componentDidMount() {
        console.log(this.props.userId);
        axios.get(`http://localhost:8080/student/reissue?id=${this.props.userId}`)
                .then(result => {
                    const arr = result.data.result.map(el => {
                        return el.bookId;
                    })
                    this.setState({bookID: arr})
                    axios.post('http://localhost:8080/student/books', {userId: this.props.userId})
                        .then(res => {
                            console.log(res.data.books);
                            this.setState({issuedBooks: res.data.books});
                        })  
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => console.log(err))
    }

    reissueHandler = (bookInfo) => {
        bookInfo.userId = this.props.userId;
        const ids = [...this.state.bookID];
        ids.push(bookInfo.bookId);
        this.setState({bookID: ids})
        console.log(this.state.bookID)
        axios.post('http://localhost:8080/student/reissue', {book: bookInfo})
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        let tableContent;
        if(this.state.issuedBooks.length > 0) {
            console.log(this.state.issuedBooks)
            tableContent = this.state.issuedBooks.map(book => {
                console.log(book)
                return (
                <tr key={book.bookId}>
                    <td>{book.bookName}</td>
                    <td>{book.bookId}</td>
                    <td>{book.fine}</td>
                    <td>{book.reIssueDate}</td>
                    <td>{this.state.bookID.includes(book.bookId) ? 'request sent' : <Button btnType="Success" clicked={() => this.reissueHandler(book)}>Reissue</Button>}</td>
                </tr>);
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
                            <th>Reissue Request</th>
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

export default StudentProfile;