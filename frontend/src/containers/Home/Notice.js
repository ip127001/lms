import React, { Component } from 'react';

import classes from './Notice.css';

class Notice extends Component {
    render() {
        return (
            <div className={classes.Notice}>
                <p>HOME PAGE login to see your inputs</p>
            </div>
        );
    }
}

export default Notice;