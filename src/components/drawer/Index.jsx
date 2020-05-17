import React from 'react';
import { useStyles } from './Style';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Box } from '@material-ui/core';
import StorageIcon from '@material-ui/icons/Storage';

export default function SwipeableTemporaryDrawer(props) {

    const classes = useStyles();

    return (
        <Box>
            <SwipeableDrawer
                open={props.open}
                onClose={props.toggleDrawer(false)}
                onOpen={props.toggleDrawer(true)}
            >
                {sideList()}
            </SwipeableDrawer>
        </Box>
    )

    function sideList() {
        return (
            <Box
                className={classes.list}
                role="presentation"
                onClick={props.toggleDrawer(false)}
                onKeyDown={props.toggleDrawer(false)}
            >
                <List>
                    <ListItem button key={'key'}>
                        <Box className={classes.iconLeftFlex}/>
                        <ArrowBackIosIcon />
                    </ListItem>
                </List>
                <List>
                    <ListItem button key={'key1'}>
                        <ListItemIcon>
                            <StorageIcon />
                        </ListItemIcon>
                        <ListItemText primary={'asdfasfas'} />
                    </ListItem>
                </List>
            </Box>
        )
    }
}