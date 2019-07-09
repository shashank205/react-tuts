import React, { Fragment } from 'react';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@material-ui/core';

export default props => {
    return(
        <Fragment>
            <Dialog open={props.open} onClose={props.closeDialog}>
                <DialogTitle>{"Unable to create task."}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        There are currently no lists. Please create one before adding tasks.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.closeDialog} color="primary" autoFocus>Close</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

