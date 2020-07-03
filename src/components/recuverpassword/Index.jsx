import React, { useState } from 'react';
import { Box, TextField } from '@material-ui/core';
import { useStyles } from './Style';
import Api from '../../util/api/Index';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import DialogNotification from '../../core/dialog/Index';

function ModalRecuverPassword(props) {
    const classes = useStyles(props);
    const [valueEmail, setValueEmail] = useState('');
    const [error, setError] = useState('');
    const [submited, setSubmited] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [textDialog, setTextDialog] = useState('');

    function handleChange(event) {
        setValueEmail(event.target.value);

        if (submited) validateFormRecPassword();
    }

    function handleBlur() {
        if (submited) validateFormRecPassword();
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSubmited(true);
        validateFormRecPassword();
    }

    function validateFormRecPassword() {
        const error = validateEmail(valueEmail)
        setError(error);
        if (!error) executeRequest()
    }

    function executeRequest() {
        const url = '/usuario/recuperacaoSenha';
        const data = {
            email: valueEmail
        };

        Api.post(url, data)
            .then(resp => {
                handleClose();
            })
            .catch(error => {
                handleClose();
                setOpenDialog(true);
                setTextDialog(error.response ? error.response.data.message : error.message);
            });
    }

    function handleClose() {
        setSubmited(false);
        setError('');
        setValueEmail('');
        props.closeModal();
    }

    function handleClickOptionOk() {
        setOpenDialog(false);
        setTextDialog('');
        setValueEmail('');
    }

    function validateEmail(email) {
        if (!email) {
            return 'E-mail é obrigatório!';
        }

        const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

        if (!regex.test(email)) {
            return 'E-mail inválido';
        }

        return '';
    }

    return (
        <Box>
            <Dialog
                open={props.open}
                className={classes.dialog}
            >
                <DialogContent className={classes.dialogContent}>
                    <TextField
                        label='E-mail'
                        fullWidth
                        name='email'
                        error={!!error}
                        helperText={error}
                        value={valueEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        className={classes.button}
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={handleSubmit}
                    >
                        <SendIcon className={classes.iconButton} />
                        Enviar
                    </Button>
                    <Button
                        className={classes.button}
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={handleClose}
                    >
                        <CloseIcon className={classes.iconButton} />
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
            {openDialog &&
                <DialogNotification
                    type='error'
                    title='Erro'
                    text={textDialog}
                    open={openDialog}
                    optionOk={handleClickOptionOk}
                />}
        </Box>
    );
}

export default ModalRecuverPassword;