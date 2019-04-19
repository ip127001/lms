import React from 'react';

import libraryLogo from '../../assets/images/books.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={libraryLogo} alt="Library" />
    </div>
);

export default logo;