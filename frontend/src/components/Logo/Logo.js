import React from 'react';

import libraryLogo from '../../assets/images/books.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={libraryLogo} alt="Library" />
    </div>
);

export default logo;