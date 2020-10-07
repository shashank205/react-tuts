import React from 'react';
import { Card, CardContent, Typography, TextField} from '@material-ui/core';
import {SpeakerNotesRounded} from '@material-ui/icons';
import { connect } from "react-redux";

const styles = {
    container: {
        height: '100%'
    },
    heading: {
        marginTop: 10,
        marginBottom: 20
    },
    options: {
        width: '100%',
        height: '80px',
        marginBottom: '30px'
    },
    dateBox: {
        float: 'left',
        width: '30%',
        height: '100%',
    },
    listBox: {
        height: '100%',
        float: 'left',
        width: '30%',
        position: 'relative'
    },
    notesIcon: {
        position: "relative",
        left: "50%",
        top: "40%",
        transform: "translate(-50%,-40%) scale(1.5)"
    },
    listTitle: {
        position: 'absolute',
        bottom: 5,
        left: "50%",
        transform: "translate(-50%,0)"
    }
}
const TaskCard = props => {
    return(
        <Card style={styles.container}>
            <CardContent>
                <Typography color="textSecondary" 
                    gutterBottom 
                    style={styles.heading}
                    variant='h4'
                >
                    {props.task.title}
                </Typography>
                <div style={styles.options}>
                    <div style={styles.dateBox}></div>
                    <div style={styles.listBox}>
                        <SpeakerNotesRounded style={styles.notesIcon}/>
                        <Typography style={styles.listTitle}>{props.task.list.title}</Typography>
                    </div> 
                </div>
                <Typography variant='subtitle2'>NOTES</Typography>
                <TextField fullWidth multiline rowsMax="5" 
                    value={props.task.notes}
                    onChange={e => props.updateNotes(e)}
                />    
            </CardContent>
        </Card>
    )
}

const mapStateToProps = state => {
    return {
        task: state.taskReducer.selectedTask
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateNotes: event => {
            dispatch({
                type: 'TASK_UPDATE_NOTES',
                payload: event.target.value
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (TaskCard)