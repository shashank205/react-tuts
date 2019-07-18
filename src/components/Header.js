import React from 'react';
import {Toolbar} from '@material-ui/core';
import AddTask from './dialogs/AddTask';

const styles = {
    toolbar: {
        position: 'fixed',
        top: 0,
        backgroundColor: 'darkcyan',
        height: '50px',
        width: '100%',
        zIndex: 10
    }
}

export default () => {
    return (
        <Toolbar style={styles.toolbar}>
            <AddTask data-test="addTaskComponent"/>
        </Toolbar>
    );
}