import React from 'react';
import { useStyles } from './Style';
import SaveIcon from '@material-ui/icons/Save';
import { Button } from '@material-ui/core';


function SaveButton(props) {

    const classes = useStyles(props);

    return (
        <Button
            className={classes.saveButton}
            variant='contained'
            color='primary'
            startIcon={<SaveIcon />}
            type={props.type}
        >
            {props.text}
        </Button>
    )
}

export default SaveButton;