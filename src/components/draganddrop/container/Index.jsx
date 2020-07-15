import React from 'react';
import { useStyles } from './Style';
import { Box, Typography } from '@material-ui/core';


function ComponentDragAndDrop(props) {

    const classes = useStyles(props);

    function drop(event) {
        event.preventDefault();
        const cardId = event.dataTransfer.getData('cardId');
        const card = document.getElementById(cardId);

        card.style.display = 'flex';

        event.target.appendChild(card);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Typography className={classes.typography}>
                    {props.title}
                </Typography>
            </Box>
            <Box 
                className={classes.containerCenter}
                id={props.containerId}
                onDrop={drop}
                onDragOver={dragOver}
            >
                {props.children}
            </Box>
        </Box>
    );
}

export default ComponentDragAndDrop;