import React, { useState } from 'react';
import { useStyles } from './Style';
import { Drawer, Box, Typography } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

function Chat(props) {
    const { open, nameUser, handleCloseChatConversation } = props;
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant='persistent'
            anchor='right'
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Box className={classes.drawerHeader}>
                <Typography>{nameUser}</Typography>
                <KeyboardArrowLeftIcon onClick={handleCloseChatConversation} />
            </Box>
            <Box className={classes.contentConversation}>
                asdfsafsafsasadfsafsafsasa
            </Box>
            <Box className={classes.contentMessage}>
                asdfsafsafsasadfsafsafsasa
            </Box>
        </Drawer>
    );
}

export default Chat;