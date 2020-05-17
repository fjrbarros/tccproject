import React from 'react';
import { useStyles } from './Style';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StorageIcon from '@material-ui/icons/Storage';
import { Box } from '@material-ui/core';

function ComponentCard(props) {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.cardHeader}>
                <StorageIcon className={classes.cardIcon}/>
                <Typography
                    color="textSecondary"
                    className={classes.title}
                >
                    {props.title}
                </Typography>
            </Box>
            <Box className={classes.cardCenter}>
                <Typography>
                    TCC Fabio Barros
                </Typography>
            </Box>
            <Box className={classes.cardBottom}>
                <Box className={classes.cardBottomFlex} />
                <Button
                    size="small"
                    className={classes.buttonCard}
                    onClick={props.onClick}
                >
                    {props.textButton}
                </Button>
            </Box>
        </Box>
    );
}

export default ComponentCard;