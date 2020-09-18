import React from 'react';
import { useStyles } from './Style';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

function Modal(props) {

    const {
        open,
        title,
        useButtonCancel,
        useButtonSave,
        onClickCancel,
        onClickSave
    } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            className={classes.modal}
        >
            <DialogTitle className={classes.modalTitle}>
                {title}
            </DialogTitle>
            <DialogContent className={classes.modalContent}>
                {props.children}
            </DialogContent>
            <DialogActions className={classes.modalAction}>
                {
                    useButtonSave &&
                    <Button
                        className={classes.saveButton}
                        variant='contained'
                        color='primary'
                        size='small'
                        startIcon={<SaveIcon />}
                        onClick={onClickSave}
                    >
                        Salvar
                    </Button>
                }
                {
                    useButtonCancel &&
                    <Button
                        className={classes.saveButton}
                        variant='contained'
                        color='primary'
                        size='small'
                        startIcon={<CloseIcon />}
                        onClick={onClickCancel}
                    >
                        Cancelar
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
}

export default Modal;