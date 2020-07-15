import React from 'react';
import { useStyles } from './Style';
import { Box } from '@material-ui/core';


function ComponentCardDragDrop(props) {

    const classes = useStyles(props);

    function dragStart(event) {
        const target = event.target;

        event.dataTransfer.setData('cardId', target.id);

        setTimeout(() => {
            target.style.display = 'none';
        },0);
    }

    function dragOver(event) {
        event.stopPropagation();
    }

    return (
        <Box 
            className={classes.card}
            id={props.cardId}
            draggable={props.draggable}
            onDragStart={dragStart}
            onDragOver={dragOver}
        >
            {props.children}
        </Box>
    );
}

export default ComponentCardDragDrop;