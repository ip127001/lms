import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>IssueBooks</NavigationItem>
        <NavigationItem link="/">Student Info</NavigationItem>
    </ul>
);

export default navigationItems;