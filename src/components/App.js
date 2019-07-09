import React, { Fragment } from 'react';
import Header from './Header';
import LeftPane from './LeftPane';
import RightPane from './RightPane';
import {Grid, CssBaseline} from '@material-ui/core';

export default () => {
    return(
        <Fragment>
            <CssBaseline />
            <Header />
            <Grid container style={{height: 'calc(100% - 50px)'}}>
                <Grid>
                    <LeftPane />
                </Grid>
                <Grid>
                    <RightPane />
                </Grid>
            </Grid>
        </Fragment>
    )
}
