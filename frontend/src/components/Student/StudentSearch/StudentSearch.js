import React from 'react';

import classes from './StudentSearch.css';
import Button from '../../UI/Button/Button';

const studentSearch = (props) => {
    let inputClass = [classes.InputElement];
    let options = null;
    if (props.touched && props.invalid) {
        inputClass.push(classes.Invalid);
    }
    if (props.select) {
        options = <div className={classes.Select}>
            <select
                    className={inputClass.join(' ')}
                    onChange={props.selectChanged} >
                    <option key="1" value="tag">tag</option>
                    <option key="2" value="subject">subject</option>
                    <option key="3" value="name">name</option>
                    <option key="4" value="author">author</option>
                </select>
        </div>
    }
    return (
            <form onSubmit={props.searchStudentHandler} className={classes.StudentSearch}>
                <div className={props.select ? classes.SelectLabel : classes.Label}>
                    <label htmlFor="search">{props.label}</label>
                </div>

                <div className={props.select ? classes.SelectInput : classes.Input}>
                    <input className={inputClass.join(' ')} 
                            type="text" 
                            name="search" 
                            placeholder="search student" 
                            id="search"
                            value={props.value}
                            onChange={props.changed} />
                </div>
                

                {options}
            
                <div className={props.select ? classes.SelectButton : classes.Button}>
                    <Button btnType="Success">Search</Button>
                </div>
            </form>
    )
}

export default studentSearch;