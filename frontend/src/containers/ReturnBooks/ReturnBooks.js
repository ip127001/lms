import React, { Component } from 'react';

import classes from './ReturnBooks.css';

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
        axios.get('http://localhost:8080/student/reissue-request')
                .then(result => {
                    console.log(result);
                    this.setState({issuedBooks: result.data.result})
                })
                .catch(err => console.log(err))
    }

    // reissueHandler = (bookInfo) => {
    //     bookInfo.userId = this.props.userId;
    //     const ids = [...this.state.bookID];
    //     ids.push(bookInfo.bookId);
    //     this.setState({bookID: ids})
    //     console.log(this.state.bookID)
    //     axios.post('http://localhost:8080/student/reissue', {book: bookInfo})
    //         .then(res => {
    //             console.log(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

    acceptHandler = (studentName, bookId) => {
        const postData = {
            studentName,
            bookId
        }
        axios.post('http://localhost:8080/student/reissue-accept', postData)
            .then(res => {
                console.log('[acceptHandler]', res)
                axios.get('http://localhost:8080/student/reissue-request')
                    .then(result => {
                        console.log(result);
                        this.setState({issuedBooks: result.data.result})
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    rejectHandler = (studentName, bookId) => {
        const postData = {
            studentName,
            bookId
        }
        axios.post('http://localhost:8080/student/reissue-reject', postData)
            .then(res => {
                console.log('[rejectHandler]', res)
                axios.get('http://localhost:8080/student/reissue-request')
                    .then(result => {
                        console.log(result);
                        this.setState({issuedBooks: result.data.result})
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    render() {
        let tableContent;
        if(this.state.issuedBooks) {
            tableContent = this.state.issuedBooks.map(student => {
                return student.reissuedBooks.map(book => {
                    return (
                        <tr key={book.bookId}>
                            <td>{student.name}</td>
                            <td>{book.name}</td>
                            <td>{book.bookId}</td>
                            <td>{book.fine}</td>
                            <td>{book.reissueDate}</td>
                            <td><Button btnType="Success" clicked={() => this.acceptHandler(student.name, book.bookId)}>Accept</Button> 
                                <Button btnType="Danger" clicked={() => this.rejectHandler(student.name, book.bookId)}>Reject</Button></td>
                        </tr>);
                })
            });
        } else {
            tableContent = (
                <tr>
                    <td></td>
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
                            <th>Student Name</th>
                            <th>Book Name</th>
                            <th>Book ID</th>
                            <th>Fine</th>
                            <th>Date of ReIssue</th>
                            <th>Accept Request</th>
                            
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