import React, { useState } from 'react';
import { Box, TextField } from '@material-ui/core';
import { useStyles } from './Style';
// import Api from '../../util/api/Index';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

function ComponentRegisterMember(props) {
    const classes = useStyles(props);
    const [valueEmail, setValueEmail] = useState('');
    const [error, setError] = useState('');

    function handleChange(event) {
        setValueEmail(event.target.value);
    }

    function handleAddMember(event) {
        event.preventDefault();
        const error = validateEmail(valueEmail)
        setError(error);
    }

    function handleClose() {
        setError('');
        setValueEmail('');
        props.close();
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        className={classes.button}
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={handleAddMember}
                    >
                    <AddIcon className={classes.iconButton} />
                        Adicionar
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
        </Box>
    );

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
}

export default ComponentRegisterMember;