import React from 'react';

import classes from './StudentSearch.css';
import Button from '../../UI/Button/Button';

const studentSearch = (props) => {
    let inputClass = [classes.InputElement];
    if (props.touched && props.invalid) {
        inputClass.push(classes.Invalid);
    }
    return (
            <form onSubmit={props.searchStudentHandler} className={classes.StudentSearch}>
                <div className={classes.Label}>
                    <label htmlFor="search">Enter Roll no of student:</label>
                </div>

                <div className={classes.Input}>
                    <input className={inputClass.join(' ')} 
                            type="text" 
                            name="search" 
                            placeholder="search student" 
                            id="search"
                            value={props.value}
                            onChange={props.changed} />
                </div>
    
                <div className={classes.Button}>
                    <Button btnType="Success">Search</Button>
                </div>
            </form>
    )
}

export default studentSearch;