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
    if(props.click) {
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
                <div className={classes.book1}>Name:{props.bookInfo.name}</div>
                <div className={classes.book2}>ID:{props.bookInfo.id}</div>
                <div className={classes.book3}>
                    <button className={classes.Button} 
                            disabled={!props.bookInfo.isAvailable} 
                            style={{cursor: !props.bookInfo.isAvailable ? "not-allowed": "pointer", 
                                    backgroundColor: !props.bookInfo.isAvailable ? "grey": "rgb(67, 163, 155)"}}>
                    Lock</button>
                    </div> 
                <div className={classes.book4}>Available: {avail}</div>
            </div>
        </div>
    )
};

export default studentBooks;