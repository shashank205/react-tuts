import React, { Fragment } from 'react';
import Header from './Header';
import LeftPane from './LeftPane';
import RightPane from './RightPane';
import {Grid, CssBaseline} from '@material-ui/core';

export default () => {
    return(
        <Fragment>
            <CssBaseline />
            <Header data-test="headerComponent"/>
            <Grid container style={{height: 'calc(100% - 50px)'}}>
                <Grid>
                    <LeftPane data-test="leftPaneComponent"/>
                </Grid>
                <Grid>
                    <RightPane data-test="rightPaneComponent"/>
                </Grid>
            </Grid>
        </Fragment>
    )
}
