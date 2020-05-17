import React from 'react';
import { useStyles } from './Style';
import { Box } from '@material-ui/core';


function ComponentCardDragDrop(props) {

    const classes = useStyles(props);

    return (
        <Box className={classes.card}>
        </Box>
    );
}

export default ComponentCardDragDrop;