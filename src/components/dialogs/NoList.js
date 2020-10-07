import React, { Fragment } from 'react';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@material-ui/core';
import PropTypes from 'prop-types';

const NoList = props => {
    return(
        <Fragment>
            <Dialog open={props.open} onClose={props.closeDialog}>
                <DialogTitle data-test="dialogTitle">{"Unable to create task."}</DialogTitle>
                <DialogContent data-test="dialogContent">
                    <DialogContentText>
                        There are currently no lists. Please create one before adding tasks.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        data-test="closeDialog"
                        onClick={props.closeDialog}
                        color="primary"
                        autoFocus
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

NoList.propTypes = {
    open: PropTypes.bool,
    closeDialog: PropTypes.func
}

export default NoList;