import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>IssueBooks</NavigationItem>
        <NavigationItem link="/student">RegisterBooks</NavigationItem>
        <NavigationItem link="/books">BooksSearch</NavigationItem>
    </ul>
);

export default navigationItems;