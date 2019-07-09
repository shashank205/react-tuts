import React, { Fragment } from 'react';
import {ListItem, ListItemText, Collapse, Checkbox, ListItemIcon} from '@material-ui/core';
import {DeleteOutline, ExpandLess, ExpandMore} from '@material-ui/icons';
import { connect } from "react-redux";

const ExpansionItem = props => {

    const deleteTask = (event, task, index) => {
        event.stopPropagation();
        const update = [...props.checkboxes];
        update.splice(index, 1);
        props.setCheckBoxes(update)
        if(props.selectedTask.id === task.id) {
            props.setSelectedTask({})
        }
        props.deleteTask(task.id);
    }

    const checkboxClick = (event, taskIndex) => {
        event.stopPropagation();
        const newBoxes = Array(props.tasks.length).fill(false);
        props.checkboxes
                        .reduce((a, e, i) => (e === true) ? a.concat(i) : a, [])
                        .map(elem => newBoxes[elem] = true);
        newBoxes[taskIndex] = !newBoxes[taskIndex];
        props.setCheckBoxes(newBoxes)
    }

    return(
        <Fragment>
            <ListItem onClick={() => props.toggleDisplay()}>
                <ListItemText primary={props.title} />
                {props.tasks.length > 0 ?
                    props.open ? <ExpandLess /> : <ExpandMore />
                    : null}
            </ListItem>
            <Collapse in={props.open} timeout="auto" unmountOnExit>
            {props.tasks.map((task, index) => 
                <ListItem button key={task.id}
                    selected={props.selectedTask.id === task.id}
                    onClick={() => props.setSelectedTask(task)}
                >
                    <Checkbox onClick={(e) => checkboxClick(e, index)}/>
                    <ListItemText primary={task.title} />
                    {props.checkboxes[index] === true ?
                    <ListItemIcon onClick={(e) => deleteTask(e, task, index)} style={{marginRight: "-30px"}}>
                        <DeleteOutline />
                    </ListItemIcon> : null}
                </ListItem>
            )} 
            </Collapse>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        open: state.taskReducer.showTaskCard,
        selectedTask: state.taskReducer.selectedTask,
        checkboxes: state.taskReducer.checkboxes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDisplay: () => {
            dispatch({
                type: 'TOGGLE_SHOW_CARD',
            })
        },
        setSelectedTask: task => {
            dispatch({
                type: 'SET_SELECTED_TASK',
                payload: task
            })
        },
        setCheckBoxes: boxes => {
            dispatch({
                type: 'SET_CHECK_BOX',
                payload: boxes
            })
        },
        deleteTask: id => {
            dispatch({
                type: 'DELETE_TASK',
                payload: id
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ExpansionItem)