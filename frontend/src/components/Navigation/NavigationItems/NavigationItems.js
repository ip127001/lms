import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            {props.isAuth && props.isAdmin ? <NavigationItem link="/" exact>IssueBooks</NavigationItem> : null}
            
            {props.isAuth && !props.isAdmin ? <NavigationItem link="/" exact>Student Profile</NavigationItem> : null}
            {props.isAuth && !props.isAdmin ? <NavigationItem link="/profile" exact>Profile</NavigationItem> : null}
            {props.isAuth && props.isAdmin ? <NavigationItem link="/student">RegisterBooks</NavigationItem> : null}
            {props.isAuth && props.isAdmin ? <NavigationItem link="/books">BooksSearch</NavigationItem> : null}
            {props.isAuth && props.isAdmin ? <NavigationItem link="/admin">SubAdmin</NavigationItem> : null}
            {props.isAuth && props.isAdmin ? <NavigationItem link="/create-student">Student</NavigationItem> : null}
            {props.isAuth && props.isAdmin ? <NavigationItem link="/return-books">ReissueBooks  </NavigationItem> : null}
            {props.isAuth ? null : <NavigationItem link="/login">Login</NavigationItem>}
            {props.isAuth ? null : <NavigationItem link="/" exact>Home</NavigationItem>}
            {props.isAuth ? <NavigationItem link="/logout" onLogout={props.onLogout}>Logout</NavigationItem> : <NavigationItem link="/signup">Signup</NavigationItem>}
        </ul>
    );
}

export default navigationItems;