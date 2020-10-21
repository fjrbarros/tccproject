import React, { useState } from 'react';
import { useStyles } from './Style';
import SearchIcon from '@material-ui/icons/Search';
import ImgUser from '../../../assets/user.png';
import ChatConversation from '../chatconversation/Index';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    Typography,
    Avatar,
    Box,
    TextField,
    IconButton,
    InputAdornment
} from '@material-ui/core';

function Chat(props) {
    const { open } = props;
    const classes = useStyles();
    const data = ['aaaaaaabbbbbbbbasdfsafsafsafsafsafsacccccccddddd', 'User 2', 'User 3', 'User 4'];

    const [openConversation, setOpenConversation] = useState(false);
    const [nameUser, setNameUser] = useState('');

    function handleMouseDownPassword(event) {
        event.preventDefault();
    };

    function handleClickListItem(event, nameuser) {
        setOpenConversation(true);
        setNameUser(nameuser);
    }

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
            <Box className={classes.chatHeader}>
                <TextField
                    label='Pesquisar'
                    fullWidth
                    // className={classes.marginBottom}
                    name='search'
                    // value={values.password}
                    // onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    // onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Box>
            <List>
                {data.map((text, index) => (
                    <ListItem
                        className={classes.listItem}
                        button
                        key={text}
                        onClick={event => handleClickListItem(event, text)}
                    >
                        <ListItemIcon>{<Avatar alt='Remy Sharp' src={ImgUser} />}</ListItemIcon>
                        <Typography className={classes.nameUser}>{text}</Typography>
                    </ListItem>
                ))}
            </List>
            {
                openConversation &&
                <ChatConversation
                    open={openConversation}
                    nameUser={nameUser}
                    handleCloseChatConversation={() => setOpenConversation(false)}
                />
            }
        </Drawer>
    );
}

export default Chat;