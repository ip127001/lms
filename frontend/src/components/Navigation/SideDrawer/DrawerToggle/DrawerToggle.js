import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => {
    return (
        <div onClick={props.clicked} className={classes.drawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default drawerToggle;