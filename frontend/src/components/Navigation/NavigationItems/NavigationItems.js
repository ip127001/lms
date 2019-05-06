import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            {props.isAuth && props.isAdmin ? <NavigationItem link="/" exact>IssueBooks</NavigationItem> : null}
            
            {props.isAuth && !props.isAdmin ? <NavigationItem link="/" exact>Student Profile</NavigationItem> : null}

            {props.isAuth && props.isAdmin ? <NavigationItem link="/student">RegisterBooks</NavigationItem> : null}
            {props.isAuth && props.isAdmin ? <NavigationItem link="/books">BooksSearch</NavigationItem> : null}
            {props.isAuth && props.isAdmin ? <NavigationItem link="/admin">CreateAdmin</NavigationItem> : null}
            {props.isAuth ? <NavigationItem link="/logout" onLogout={props.onLogout}>Logout</NavigationItem> : <NavigationItem link="/signup">Signup</NavigationItem>}
            {props.isAuth ? null : <NavigationItem link="/" exact>Login</NavigationItem>}
        </ul>
    );
}

export default navigationItems;