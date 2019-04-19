import React from 'react';

import classes from './Form.css';

const Form = (props) => {
    return (
        <div className={classes.Form}>
            <p>hi there</p>
            <button className={classes.button} onClick={props.issued}>Student Info</button>
        </div>
    )
}

export default Form;