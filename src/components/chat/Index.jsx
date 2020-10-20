import React, { useState } from 'react';
import { useStyles } from './Style';
import SearchIcon from '@material-ui/icons/Search';
import ImgUser from '../../assets/user.png';
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
    const data = ['aaaaaaabbbbbbbbcccccccddddd', 'User 2', 'User 3', 'User 4'];

    const [teste, setTeste] = useState(false);

    function handleMouseDownPassword(event) {
        event.preventDefault();
    };

    function getDrawerTeste() {
        return (
            <Drawer
                className={classes.drawer}
                variant='persistent'
                anchor='right'
                open={teste}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div>asdfasfsafasfsafsafsafsafsa</div>
            </Drawer>
        );
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
                        onClick={() => setTeste(true)}
                    >
                        <ListItemIcon>{<Avatar alt='Remy Sharp' src={ImgUser} />}</ListItemIcon>
                        <Typography className={classes.nameUser}>{text}</Typography>
                    </ListItem>
                ))}
            </List>
            {teste && getDrawerTeste()}
        </Drawer>
    );
}

export default Chat;