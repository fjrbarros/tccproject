import React from 'react';
import { useStyles } from './Style';
import { Box, Typography } from '@material-ui/core';


function ComponentDragAndDrop(props) {

    const classes = useStyles(props);

    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Typography className={classes.typography}>
                    {props.title}
                </Typography>
            </Box>
            <Box className={classes.containerCenter}>
                {props.children}
            </Box>
        </Box>
    );
}

export default ComponentDragAndDrop;