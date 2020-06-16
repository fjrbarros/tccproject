import React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './Styles';
import './Styles.css';

function Loading() {

    const classes = useStyles();

    return (
        <Box className={classes.containerLoading}>
            <span className='spinner'></span>
        </Box>
    );
}

export default Loading;