import React, { useState } from 'react';
import { useStyles } from './Style';
import { Button, TextField } from '@material-ui/core';
import PhoneField from '../../core/input/phone/Index';
import PasswordField from '../../core/input/password/Index';
import SaveIcon from '@material-ui/icons/Save';
import { validateForm } from '../../util/validate/Index';


function ComponentRegister(props) {

    const classes = useStyles(props);

    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confPassword: ''
    });

    const [error, setError] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confPassword: '',
    });

    const [submited, setSubmited] = useState(false);

    function handleChange(event) {
        setValues({ ...values, [event.target.name]: event.target.value });

        if (submited) validateFormCadastro();
    }

    function handleBlur() {
        if (submited) validateFormCadastro();
    }

    return (
        <form className={classes.cadastro} onSubmit={handleSubmit}>
            <TextField
                label='Nome completo'
                name='name'
                fullWidth
                className={classes.marginTopBottom}
                error={!!error.name}
                helperText={error.name}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <PhoneField
                label='Fone'
                name='phone'
                mask='(99) 99999-9999'
                fullWidth
                className={classes.marginBottom}
                error={!!error.phone}
                helperText={error.phone}
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                label='E-mail'
                fullWidth
                className={classes.marginBottom}
                name='email'
                value={values.email}
                error={!!error.email}
                helperText={error.email}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <PasswordField
                label='Senha'
                fullWidth
                className={classes.marginBottom}
                name='password'
                value={values.password}
                error={!!error.password}
                helperText={error.password}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <PasswordField
                label='Confirmação senha'
                fullWidth
                className={classes.marginBottom}
                name='confPassword'
                value={values.confPassword}
                error={!!error.confPassword}
                helperText={error.confPassword}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <Button
                className={classes.saveButton}
                variant='contained'
                color='primary'
                startIcon={<SaveIcon />}
                type='submit'
            >
                Salvar
            </Button>
        </form>
    );

    function handleSubmit(event) {
        event.preventDefault();
        setSubmited(true);
        validateFormCadastro();
    }

    function validateFormCadastro() {
        const errors = {};
        validateForm(values, (campo, msg) => errors[campo] = msg);
        setError(errors);
        // if (Object.keys(errors).length === 0) {
        //     executeRequest();
        // }
    }

    // function executeRequest() {
        
    //     const url = '/usuario/login/';
    //     const data = {
    //         email: values.email,
    //         senha: values.password,
    //         tokenConfirmacao: ''
    //     };

    //     Api.post(url, data)
    //         .then(resp => {
    //             localStorage.setItem('authenticad', true);
    //             history.push('/dashboard');
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }
}

export default ComponentRegister;