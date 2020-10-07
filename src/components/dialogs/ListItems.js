import React, {Fragment} from 'react';
import {Dialog, DialogTitle, ListItem, List, ListItemText, Link} from '@material-ui/core';
import CheckBox from '@material-ui/icons/CheckBox';
import { connect } from "react-redux";

const ListItems = props => {
    
    const onClickListItem = (list) => {
        props.changeListCategory(list);
        props.handleToggle();
    }    

    return(
        <Fragment>
            <Link onClick={props.handleToggle} underline="none">{props.list.title}</Link>
            <Dialog open={props.open} onClose={props.handleToggle}>
                <DialogTitle>Move to...</DialogTitle>
                <List>
                    {props.lists.map(list => (
                    <ListItem button key={list.id} onClick={() => onClickListItem(list)}>
                        <ListItemText primary={list.title} />
                        <CheckBox style={props.list.id !== list.id ? {display: "none"} : null}/>
                    </ListItem>
                    ))}
                </List>
            </Dialog>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        open: state.dialogReducer.openList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleToggle: () => {
            dispatch({
                type: 'TOGGLE_LIST_ITEMS'
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItems)