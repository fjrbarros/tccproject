import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box } from '@material-ui/core';
import { useStyles } from './Style';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CloseIcon from '@material-ui/icons/Close';

function AlertDialog(props) {

    const classes = useStyles(props);

    function getIconType() {
        switch (props.type) {
            case 'alert':
                return <ErrorOutlineIcon className={classes.dialogIcon} />
            case 'error':
                return <CloseIcon className={classes.dialogIcon} />
            case 'confirm':
                return <HelpOutlineIcon className={classes.dialogIcon} />
            default:
                return <ErrorOutlineIcon className={classes.dialogIcon} />
        }
    }

    function getButtonType() {
        switch (props.type) {
            case 'alert':
            case 'error':
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.optionOk}
                    >
                        Ok
                    </Button>
                )
            case 'confirm':
                return (
                    <React.Fragment>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={props.optionYes}
                        >
                            Sim
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={props.optionNo}
                        >
                            Não
                        </Button>
                    </React.Fragment>
                )
            default:
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.optionOk}
                    >
                        Ok
                    </Button>
                )
        }
    }

    return (
        <Box>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                className={classes.dialog}
            >
                <Box className={classes.dialogHeader}>
                    <Box className={classes.dialogHeaderIcon}>
                        {getIconType()}
                    </Box>
                    <DialogTitle className={classes.dialogHeaderTitle}>
                        {props.title}
                    </DialogTitle>
                </Box>
                <DialogContent>
                    <DialogContentText
                        className={classes.dialogCenter}
                    >
                        {props.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {getButtonType()}
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default AlertDialog;