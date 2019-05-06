import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {props.isAuth ? <NavigationItem link="/" exact>IssueBooks</NavigationItem> : <NavigationItem link="/" exact>Login</NavigationItem>}
        {props.isAuth ? <NavigationItem link="/student">RegisterBooks</NavigationItem> : null}
        {props.isAuth ? <NavigationItem link="/books">BooksSearch</NavigationItem> : null}
        {props.isAuth ? <NavigationItem link="/logout" onLogout={props.onLogout}>Logout</NavigationItem> : <NavigationItem link="/signup">Signup</NavigationItem>}
    </ul>
);

export default navigationItems;