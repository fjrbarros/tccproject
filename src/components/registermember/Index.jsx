import React, { useState } from 'react';
import { Box, TextField } from '@material-ui/core';
import { useStyles } from './Style';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// import InputAutoComplete from '../../core/input/autocomplete/Index';

import Combobox from 'react-widgets/lib/Combobox';
import 'react-widgets/dist/css/react-widgets.css';

function ComponentRegisterMember(props) {
    const classes = useStyles(props);
    const [values, setValues] = useState({
        email: '',
        typeMember: ''
    });
    const [error, setError] = useState({
        email: '',
        typeMember: ''
    });
    const { typeMember } = props;

    function handleChange(event, newValue) {
        if (newValue) {
            setValues({ ...values, typeMember: newValue });
            return;
        }
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    function handleAddMember(event) {
        event.preventDefault();
        const errors = {};
        validateValues(values, (campo, msg) => errors[campo] = msg);
        setError(errors);
        // if (request && Object.keys(errors).length === 0) {
        //     localStorage.removeItem('authenticad');
        //     executeRequest();
        // }
    }

    function validateValues(values, errorFn) {
        let msg;
        if (values.hasOwnProperty('email')) {
            if ((msg = validateEmail(values.email))) {
                errorFn('email', msg)
            }
        }

        if (values.hasOwnProperty('typeMember')) {
            if ((msg = validateTypeMember(values.typeMember))) {
                errorFn('typeMember', msg)
            }
        }
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

    function validateTypeMember(typeMember) {
        if (!typeMember) return 'Campo Tipo de membro obrigatório!';

        return '';
    }

    function handleClose() {
        setError('');
        setValues({ email: '', typeMember: '' });
        props.close();
    }

    const colors = ['Azul', 'Preto', 'Branco'];

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
                        error={!!error.email}
                        helperText={error.email}
                        value={values.email}
                        onChange={handleChange}
                    />
                    <Combobox
                        data={colors}
                        // defaultValue={"orange"}
                        // disabled={["red", "purple"]}
                    />
                    {/* <InputAutoComplete
                        style={{ marginTop: '15px' }}
                        label='Tipo de membro'
                        name='typeMember'
                        error={!!error.typeMember}
                        helperText={error.typeMember}
                        options={typeMember}
                        getOptionLabel={(option) => option.descricao}
                        getOptionSelected={(option, value) => option.descricao === value.descricao}
                        value={values.typeMember}
                        onChange={handleChange}
                    /> */}
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
}

export default ComponentRegisterMember;