import React, { useState } from 'react';
import { useStyles } from './Style';
import Modal from '@material-ui/core/Modal';
import { Backdrop, Fade, TextField, Button, Box } from '@material-ui/core';
import Dialog from '../../core/dialog/Index';
import Api from '../../util/api/Index';

function ModalRecuverPassword(props) {
    const classes = useStyles();
    const [valueEmail, setValueEmail] = useState('');
    const [error, setError] = useState('');
    const [submited, setSubmited] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);

    const [textDialog, setTextDialog] = useState('');

    const [typeDialog, setTypeDialog] = useState('');

    const [titleDialog, setTitleDialog] = useState('');

    function handleChange(event) {
        setValueEmail(event.target.value);

        if (submited) validateFormRecPassword();
    }

    function handleClickOptionOk() {
        setOpenDialog(false);
        setTextDialog('');
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
        if(!error) executeRequest()
    }

    function executeRequest() {
        const url = '/usuario/recuperacaoSenha';
        const data = {
            email: valueEmail
        };

        Api.post(url, data)
            .then(resp => {
                handleClose();
                setTextDialog('E-mail enviado com sucesso!');
                setTypeDialog('info');
                setTitleDialog('Confirmação');
                setOpenDialog(true);
            })
            .catch(error => {
                handleClose();
                setTypeDialog('alert');
                setTitleDialog('Atenção');
                setTextDialog(error.response.data.message);
                setOpenDialog(true);
            });
    }

    function handleClose() {
        setSubmited(false);
        setError('');
        setValueEmail('');
        props.closeModal();
    }

    return (
        <React.Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <form className={classes.paper} onSubmit={handleSubmit}>
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
                        <Box className={classes.modalBottom}>
                            <Box className={classes.bottomLeft} />
                            <Button
                                className={classes.buttonSave}
                                type='submit'
                            >   Salvar
                        </Button>
                        </Box>
                    </form>
                </Fade>
            </Modal>
            <Dialog
                type={typeDialog}
                title={titleDialog}
                text={textDialog}
                open={openDialog}
                optionOk={handleClickOptionOk}
            />
        </React.Fragment>
    );
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

export default ModalRecuverPassword;