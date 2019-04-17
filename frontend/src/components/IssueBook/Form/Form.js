import React from 'react';

import classes from './Form.css';

const Form = (props) => {
    return (
        <div className={classes.Form}>
            <p>hi there</p>
            <button type="button" onClick={props.issued}>Student info</button>
        </div>
    )
}

export default Form;