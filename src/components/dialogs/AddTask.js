import React, {Fragment} from 'react';
import AddIcon from '@material-ui/icons/Add';
import {Fab, Button, Grid, Dialog, Paper, Chip, TextField} from '@material-ui/core';
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

class AddTask extends React.Component {
            
    onClickAddTask = () => {
        let date;
        switch(this.props.dateLabel) {
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
                date = this.props.customDate;
                break;    
            case chipLabels[5]: 
                date="someday"
                break;            
            default:
                date = new Date();  
        }
        const task = {
            id: new Date() + this.props.task.toLocaleLowerCase().replace(/ /g, '-'),
            list: this.props.selectedList,
            date: date,
            title: this.props.task,
            notes: this.props.notes
        }
        this.props.createTask(task, this.props.activeList.id);
        this.props.handleToggle(this.props.activeList);
    }    

    render() {
        return(
            <Fragment>
                <Fab variant="extended" onClick={() => this.props.handleToggle(this.props.activeList)} style={styles.button} color="secondary" size="small" >
                    <AddIcon style={styles.addIcon}/>
                    New
                </Fab>
                {this.props.lists.length > 0 ?
                <Dialog open={this.props.open} onClose={() => this.props.handleToggle(this.props.activeList)}fullWidth>
                    <Grid container>
                        <Grid item xs={8}>
                            <div style={styles.left}>
                                <TextField
                                    style={{width: "100%"}}
                                    placeholder="I want to..."
                                    variant="outlined"
                                    onChange={(e) => this.props.updateTaskName(e)}
                                />
                                <TextField
                                    label="Notes"
                                    multiline
                                    rows="14"
                                    variant="outlined"
                                    style={{width: "100%", marginTop: "10px"}}
                                    onChange={(e) => this.props.updateTaskNotes(e)}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper style={styles.right}>
                                <h5>LIST:</h5>
                                    <ListItems
                                        list={this.props.selectedList}
                                        lists={this.props.lists}
                                        changeListCategory={this.props.changeListCategory}
                                    />
                                <h5>REMIND ME:</h5>
                                {chipLabels.map(label => 
                                    <div key={label} style={styles.chipDiv}>
                                        <Chip 
                                            label={label}
                                            size="small"
                                            onClick={(e) => this.props.setDate(e)}
                                            style={styles.chip}
                                            color={this.props.dateLabel === label ? "secondary" : "default"}
                                        />
                                    </div>
                                )}
                                {this.props.showDatePicker ? 
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        onAccept={(date) => this.props.setCustomDate(date)}
                                        cancelLabel=''
                                        onClose={() => this.props.closeDatePicker}
                                        open={true}
                                        value={this.props.customDate}
                                        onChange={() => {}}
                                        disablePast={true}
                                    />
                                </MuiPickersUtilsProvider> : null}
                            </Paper>
                        </Grid>
                    </Grid>                    
                    <Button 
                        color="secondary"
                        style={styles.addTask}
                        disabled={!this.props.task}
                        onClick={() => this.onClickAddTask()}
                    >
                        Add Task
                    </Button>
                </Dialog> : <NoList open={this.props.open} closeDialog={() => this.props.handleToggle(this.props.activeList)}/>}
            </Fragment>
        )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(AddTask)