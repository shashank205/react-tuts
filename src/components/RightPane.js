import React from 'react';
import { Paper } from '@material-ui/core';
import ExpansionItem from './ExpansionItem';
import moment from 'moment';
import TaskCard from './TaskCard';
import { connect } from "react-redux";

const styles = {
    container: {
        top: '60px',
        left: '240px',
        position: 'fixed',
        width: 'calc(100% - 240px)',
        height: '100%'
    },
    title: {
        marginLeft: "50px"
    },
    paper1: {
        marginLeft: "50px",
        width: '35%',
        float: 'left',
        height: '70%',
    },
    paper2: {
        marginRight: '50px',
        width: '35%',
        height: '70%',
        float: 'right'
    },
    papers: {
        width: '100%',
        height: '100%',
    }
}
const dateTypes= ['Today', 'Tomorrow', 'Upcoming', 'Someday'];
const RightPane = props => {  

    const getTasksByDate = () => {
        const tasks = [[], [], [], []];
        props.tasks.forEach(task => {
            if(task.date === 'someday') {
                tasks[3].push(task);
            } else if(moment(task.date).isSame(moment(), 'd')) {
                tasks[0].push(task);
            } else if(moment(task.date).isSame(moment().add(1, 'days'), 'd')) {
                tasks[1].push(task);
            } else {
                tasks[2].push(task);
            }
        });
        return tasks;
    }
    const tasksByDate = getTasksByDate();

    return(
        <div style={styles.container}>
            <h1  style={styles.title}>{props.menu}</h1>
            <div style={styles.papers}>
                <Paper style={styles.paper1}>
                {dateTypes.map((date, index) =>
                <ExpansionItem
                    key={date}
                    title={date}
                    tasks={tasksByDate[index]}
                />
                )}    
                </Paper>
                {props.selectedTask.hasOwnProperty('title') ? 
                <div style={styles.paper2} >
                    <TaskCard />
                </div> : null
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.taskReducer.activeTasks,
        selectedTask: state.taskReducer.selectedTask,
        menu: state.listReducer.displayTitle
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps) (RightPane);