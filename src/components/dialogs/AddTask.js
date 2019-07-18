import React, {Fragment} from 'react';
import AddIcon from '@material-ui/icons/Add';
import {Fab, Button, Grid, Dialog, Paper, Chip, TextField, withStyles} from '@material-ui/core';
import {DatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';  
import DateFnsUtils from '@date-io/date-fns';
import ListItems from './ListItems';
import moment from 'moment';
import NoList from './NoList';
import { connect } from "react-redux";

const styles = {
    button: {
        paddingRight: 20,
        paddingLeft: 10,
        marginLeft: 40,
        textTransform: "unset"
    },
    addIcon: {
        marginRight: 10
    },
    chipDiv: {
        marginTop: "10px",
    },
    chip: {
        width: "120px",
        justifyContent: "start",
        paddingLeft: "15px"
    },
    left: {
        height: "90%",
        marginTop: "10px",
        marginLeft: "10px"
    },
    right: {
        marginBottom: "100px",
        marginLeft: "10px",
        paddingBottom: "10px",
        paddingLeft: "10px"
    },
    addTask: {
        position: "absolute",
        left: "50%",
        bottom: "0",
        transform: "translate(-50%,0%)"
    }
}

const chipLabels = ["Later Today", "This Evening", "Tomorrow", "Next Week", "Custom", "Someday"];

const AddTask = props => {
            
    const onClickAddTask = () => {
        let date;
        switch(props.dateLabel) {
            case chipLabels[0]: 
            case chipLabels[1]: 
                date = new Date();
                break;    
            case chipLabels[2]: 
                date = moment(new Date()).add(1, 'days');
                break;
            case chipLabels[3]: 
                date = moment(new Date()).add(7, 'days');
                break;
            case chipLabels[4]: 
                date = props.customDate;
                break;    
            case chipLabels[5]: 
                date="someday"
                break;            
            default:
                date = new Date();  
        }
        const task = {
            id: new Date() + props.task.toLocaleLowerCase().replace(/ /g, '-'),
            list: props.selectedList,
            date: date,
            title: props.task,
            notes: props.notes
        }
        props.createTask(task, props.activeList.id);
        props.handleToggle(props.activeList);
    }
        
    const {classes} = props;

    return(
        <Fragment>
            <Fab variant="extended" onClick={() => props.handleToggle(props.activeList)} className={classes.button} color="secondary" size="small" >
                <AddIcon className={classes.addIcon}/>New
            </Fab>
            {props.lists.length > 0 ?
            <Dialog data-test='dialogComponent' open={props.open} onClose={() => props.handleToggle(props.activeList)}fullWidth>
                <Grid container>
                    <Grid item xs={8}>
                        <div className={classes.left}>
                            <TextField
                                style={{width: "100%"}}
                                placeholder="I want to..."
                                variant="outlined"
                                onChange={(e) => props.updateTaskName(e)}
                            />
                            <TextField
                                label="Notes"
                                multiline
                                rows="14"
                                variant="outlined"
                                style={{width: "100%", marginTop: "10px"}}
                                onChange={(e) => props.updateTaskNotes(e)}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.right}>
                            <h5>LIST:</h5>
                                <ListItems
                                    list={props.selectedList}
                                    lists={props.lists}
                                    changeListCategory={props.changeListCategory}
                                />
                            <h5>REMIND ME:</h5>
                            {chipLabels.map(label => 
                                <div key={label} className={classes.chipDiv}>
                                    <Chip 
                                        label={label}
                                        size="small"
                                        onClick={(e) => props.setDate(e)}
                                        className={classes.chip}
                                        color={props.dateLabel === label ? "secondary" : "default"}
                                    />
                                </div>
                            )}
                            {props.showDatePicker ? 
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    onAccept={(date) => props.setCustomDate(date)}
                                    cancelLabel=''
                                    onClose={() => props.closeDatePicker}
                                    open={true}
                                    value={props.customDate}
                                    onChange={() => {}}
                                    disablePast={true}
                                />
                            </MuiPickersUtilsProvider> : null}
                        </Paper>
                    </Grid>
                </Grid>                    
                <Button 
                    color="secondary"
                    className={classes.addTask}
                    disabled={!props.task}
                    onClick={() => onClickAddTask()}
                >
                    Add Task
                </Button>
            </Dialog> : <NoList open={props.open} closeDialog={() => props.handleToggle(props.activeList)}/>}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        open: state.dialogReducer.openAdd,
        selectedList: state.dialogReducer.selectedList,
        dateLabel: state.dialogReducer.dateLabel,
        task: state.dialogReducer.task,
        showDatePicker: state.dialogReducer.showDatePicker,
        customDate: state.dialogReducer.customDate,
        notes: state.dialogReducer.notes,
        activeList: state.listReducer.activeList,
        lists: state.listReducer.lists
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleToggle: (list) => {
            dispatch({
                type: 'TOGGLE_ADD_TASK',
                payload: list
            })
        },
        changeListCategory: list => {
            dispatch({
                type: 'CHANGE_LIST',
                payload: list
            })
        },
        setDate: event => {
            dispatch({
                type: 'SET_DATE',
                payload: event.target.innerHTML
            })
        },
        setCustomDate: date => {
            dispatch({
                type: 'CUSTOM_DATE',
                payload: date
            })
        },
        closeDatePicker: date => {
            dispatch({
                type: 'CLOSE_DATE_PICKER',
                payload: date
            })
        },
        updateTaskNotes: event => {
            dispatch({
                type: 'UPDATE_NOTES',
                payload: event.target.value
            })
        },
        updateTaskName: event => {
            dispatch({
                type: 'UPDATE_TASK',
                payload: event.target.value
            })
        },
        createTask: (task, id) => {
            dispatch({
                type: 'CREATE_TASK',
                payload: {
                    task,
                    id
                }
            })
        }
    }
}

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(AddTask)
);