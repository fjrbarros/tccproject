import React from 'react';
import { useStyles } from './Style';
import { Box } from '@material-ui/core';


function ComponentBody(props) {

    const classes = useStyles(props);

    return (
        <Box className={classes.body} >
            {props.children}
        </Box>
    );

}

export default ComponentBody;