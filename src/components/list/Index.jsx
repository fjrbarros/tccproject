import React from 'react';
import { useStyles } from './Style';
import { Typography, Tooltip } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function ComponentList(props) {

    const { data } = props;

    const classes = useStyles();

    return (
        <ul className={classes.listMember}>
            {
                data.map(item => {
                    return (
                        <li className={classes.itemListMember}>
                            <Typography className={classes.itemListDescription}>
                                {item.email}
                            </Typography>
                            <Tooltip title='Remover membro' placement='bottom'>
                                <DeleteForeverIcon
                                    className={classes.iconRemoveMember}
                                />
                            </Tooltip>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default ComponentList;