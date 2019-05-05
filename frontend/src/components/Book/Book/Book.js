import React from 'react';

import classes from './Book.css';

const studentBooks = (props) => {
    let avail;
    if(props.bookInfo.isAvailable) {
        avail = 'Yes'
    } else {
        avail = 'No'
    }
    let clickedClass = classes.Clicked;
    if(props.click && props.idBook === props.bookInfo.id) {
        clickedClass = classes.NewClicked;
    }

    return (
        <div className={classes.Books}>
            <div className={classes.Book} onClick={props.clicked}>
                <div className={classes.Info1}>Name of Book: {props.bookInfo.name}</div>
                <div className={classes.Info2}>Subject: {props.bookInfo.subject}</div>
                <div className={classes.Info3}>Author: {props.bookInfo.author}</div>
            </div>

            <div className={clickedClass}>
                <span>Name: {props.bookInfo.name}</span>
                <span>ID: {props.bookInfo.id}</span>
                <span><button className={classes.Button}>Lock</button></span>
                <span>Available: {avail}</span>
            </div>
        </div>
    )
};

export default studentBooks;