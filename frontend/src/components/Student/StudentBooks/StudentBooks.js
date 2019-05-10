import React from 'react';

import classes from './studentBooks.css';

const studentBooks = (props) => {
    let tableContent;
    if(props.books) {
        tableContent = props.books.map(book => {
            console.log(book)
            return (
            <tr key={book.bookId}>
                <td>{book.bookName}</td>
                <td>{book.bookId}</td>
                <td>{book.fine}</td>
                <td>{book.reIssueDate}</td>
            </tr>);
        });
    } else {
        tableContent = (
            <tr>
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
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        </div>
    );
}

export default studentBooks;