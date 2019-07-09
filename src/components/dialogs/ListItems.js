import React, {Fragment} from 'react';
import {Dialog, DialogTitle, ListItem, List, ListItemText, Link} from '@material-ui/core';
import CheckBox from '@material-ui/icons/CheckBox';
import { connect } from "react-redux";

class ListItems extends React.Component {
    
    onClickListItem = (list) => {
        this.props.changeListCategory(list);
        this.props.handleToggle();
    }    

    render() {
        return(
            <Fragment>
                <Link onClick={this.props.handleToggle} underline="none">{this.props.list.title}</Link>
                <Dialog open={this.props.open} onClose={this.props.handleToggle}>
                    <DialogTitle>Move to...</DialogTitle>
                    <List>
                        {this.props.lists.map(list => (
                        <ListItem button key={list.id} onClick={() => this.onClickListItem(list)}>
                            <ListItemText primary={list.title} />
                            <CheckBox style={this.props.list.id !== list.id ? {display: "none"} : null}/>
                        </ListItem>
                        ))}
                    </List>
                </Dialog>
            </Fragment>
        )
    }
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