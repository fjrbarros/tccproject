import React from 'react';
import { useStyles } from './Style';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ImgUser from '../../assets/user.png';

function Chat(props) {
    const { open } = props;
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
            <List>
                {['aaaaaaabbbbbbbbcccccccddddd', 'User 2', 'User 3', 'User 4'].map((text, index) => (
                    <ListItem
                        className={classes.listItem}
                        button
                        key={text}
                    >
                        <ListItemIcon>{<Avatar alt='Remy Sharp' src={ImgUser} />}</ListItemIcon>
                        <Typography className={classes.nameUser}>{text}</Typography>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Chat;