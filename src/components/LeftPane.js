import React, {Fragment} from 'react';
import {Paper, List, ListItemText, ListItem, ListItemIcon, withStyles, TextField} from '@material-ui/core';
import {DeleteOutline, Edit, CheckCircle, Close, CheckCircleOutline} from '@material-ui/icons';
import { connect } from "react-redux";

const styles = {
    container: {
        width: "250px",
        height: '100%',
        overflowY: 'scroll',
        position: 'fixed',
        top: '50px',
        left: 0
    },
    newList: {
        border: "none",
        marginLeft: '35px',
        width: "60%",
        marginBottom: '100px'
    },
    '@global': {
        'html, body, #root': {
            height: '100%',
            overflow: 'hidden',
            display: 'flex'
        }
    },
    listText: {
        marginLeft: '20px'
    }
}   

const LeftPane = props => {

    const inputChange = event => {
        if(props.listError) {
            props.setNameError(false);
        }
        const input = event.target.value;
        if(event.keyCode === 13 && input) {
            if(doesListExist(input)) {
                props.setNameError(true);
                return;
            }
            const list = {
                id: input.toLocaleLowerCase().replace(/ /g, '-'),
                title: input.charAt(0).toUpperCase()+input.slice(1)
            };
            props.createList(list);
            event.target.value = "";
        }
    }

    const doesListExist = title =>
        props.lists
            .map(list => list.title.toLocaleLowerCase())
            .includes(title.toLocaleLowerCase().trim());

    const saveChange = event => {
        event.stopPropagation();
        props.toggleDeleteMode();
        props.saveChanges();
    }

    const onSelectMenu = id => {
        if(!props.deleteMode) {
            props.selectList(id);
            props.taskSelectList(id);
        }
    }

    const selectAllTasks = () => {
        props.selectAllLists();
        props.selectAllTasks();
    }

    const {classes} = props;
    return (
        <Paper className={classes.container}>
            <List>
                <ListItem button onClick={() => selectAllTasks()}>
                    <ListItemIcon style={{marginRight: -20}}>
                        <CheckCircleOutline />
                    </ListItemIcon> 
                    <ListItemText className={classes.listText} primary="MY LISTS" />
                    {!props.deleteMode ? 
                    <ListItemIcon style={{marginRight: -25}} onClick={() => props.toggleDeleteMode()}>
                        <Edit />
                    </ListItemIcon> :
                    <Fragment>
                        <ListItemIcon style={{marginRight: -25}} onClick={(e) => props.discardChanges(e, props.lists)}>
                            <Close />
                        </ListItemIcon>
                        <ListItemIcon style={{marginRight: -25}} onClick={(e) => saveChange(e)}>
                            <CheckCircle />
                        </ListItemIcon>
                    </Fragment>
                    }
                </ListItem>
                {!props.deleteMode ? 
                <ListItem button onClick={() => selectAllTasks()}>
                    <ListItemText className={classes.listText} primary="All Tasks" />
                </ListItem> : null }
                {props.lists.map( list => 
                    <ListItem key={list.id} button onClick={() => onSelectMenu(list.id)}>
                        <ListItemText className={classes.listText} primary={list.title} />
                        {props.deleteMode ?
                        <ListItemIcon onClick={(e) => props.deleteList(e, list.id)}>
                            <DeleteOutline />
                        </ListItemIcon> : null}
                    </ListItem>
                )}
                {!props.deleteMode ? 
                <TextField
                    label={props.listError ? "List already exists" : ""}
                    placeholder="+ New List"
                    onKeyDown={(e) => inputChange(e)}
                    className={classes.newList}
                    margin="normal"
                /> : null}
            </List>
        </Paper>
    )
} 

const mapStateToProps = state => {
    return {
        deleteMode: state.listReducer.deleteMode,
        lists: state.listReducer.lists,
        listError: state.listReducer.nameError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDeleteMode: () => {
            dispatch({
                type: 'TOGGLE_DELETE_MODE'
            })
        },
        discardChanges: (event, lists) => {
            event.stopPropagation();
            dispatch({
                type: 'DISCARD_CHANGES',
                payload: lists
            })
        },
        setNameError: value => {
            dispatch({
                type: 'NAME_ERROR',
                payload: value
            })
        },
        deleteList: (event, id) => {
            event.stopPropagation();
            dispatch({
                type: 'DELETE_LIST',
                payload: id
            })
        },
        createList: list => {
            dispatch({
                type: 'CREATE_LIST',
                payload: list
            })
        },
        saveChanges: list => {
            dispatch({
                type: 'SAVE_CHANGES'
            })
        },
        selectList: id => {
            dispatch({
                type: 'SELECT_LIST',
                payload: id
            })
        },
        taskSelectList: id => {
            dispatch({
                type: 'TASK_SELECT_LIST',
                payload: id
            })
        },
        selectAllLists: () => {
            dispatch({
                type: 'SELECT_ALL_LISTS'
            })
        },
        selectAllTasks: () => {
            dispatch({
                type: 'SELECT_ALL_TASKS'
            })
        },
    }
}

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(LeftPane)
);