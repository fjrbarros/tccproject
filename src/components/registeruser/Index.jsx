import React, { useState, useEffect } from 'react';
import { useStyles } from './Style';
import { Button, TextField, Box } from '@material-ui/core';
import { validateForm } from '../../util/validate/Index';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import Api from '../../util/api/Index';
import PhoneField from '../../core/input/phone/Index';
import PasswordField from '../../core/input/password/Index';
import SaveIcon from '@material-ui/icons/Save';
import Body from '../../components/body/Index';
import Dialog from '../../core/dialog/Index';
import Loading from '../../components/loading/Index';

function ComponentRegisterUser(props) {
    const classes = useStyles(props);
    const location = useLocation();
    const isNewUser = props.isNewUser;
    const _id = useSelector(state => state.id);
    const _name = useSelector(state => state.name);
    const _email = useSelector(state => state.email);
    const _phone = useSelector(state => state.phone);
    const [isLoading, setIsLoading] = useState(false);
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
    const [dialog, setDialog] = useState({
        open: false,
        message: '',
        type: '',
        title: ''
    });

    function handleChange(event) {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        if(location.pathname === '/register-user') return;
        setValues({
            ...values,
            name: _name,
            email: _email,
            phone: _phone
        });
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        validateFormCadastro();
    }

    function validateFormCadastro() {
        const errors = {};
        validateForm(values, (campo, msg) => errors[campo] = msg);
        setError(errors);
        if (Object.keys(errors).length === 0) {
            if (isNewUser) {
                registerNewUser();
            } else {
                updateUser();
            }
        }
    }

    function updateUser() {
        const urlInfo = `/usuario/${_id}`;
        const urlPassword = `/usuario/alteracaoSenha/${_id}`;
        const newPassword = { senha: values.password };
        const dataInfo = {
            email: values.email,
            nome: values.name,
            foneContato: values.phone.replace(/\D/g, '')
        };

        setIsLoading(true);
        Api.all([
            Api.put(urlInfo, dataInfo),
            Api.post(urlPassword, newPassword)
        ]).then(Api.spread((respInf, respPass) => {
            setIsLoading(false);
            resetData();
            Toast.notify('Dados salvos com sucesso.', { duration: 2000 });
        })).catch(error => {
            setIsLoading(false);
            openDialog('alert', error.response.data.message);
        });
    }

    function registerNewUser() {
        const url = '/usuario';
        const data = {
            email: values.email,
            nome: values.name,
            senha: values.password,
            foneContato: values.phone.replace(/\D/g, '')
        };

        setIsLoading(true);
        Api.post(url, data)
            .then(resp => {
                setIsLoading(false);
                resetData();
                Toast.notify('Dados salvos com sucesso.', { duration: 2000 });
            })
            .catch(error => {
                setIsLoading(false);
                openDialog('alert', error.response.data.message);
            });
    }

    function openDialog(type, message) {
        setDialog({
            ...dialog,
            message: message,
            type: type,
            open: true,
            title: type === 'alert' ? 'Atenção' : 'Confirmação'
        });
    }

    function handleCloseDialog() {
        setDialog({
            ...dialog,
            message: '',
            type: '',
            open: false,
            title: ''
        });
    }

    function resetData() {
        setValues({
            name: '',
            email: '',
            phone: '',
            password: '',
            confPassword: ''
        });
    }

    return (
        <Body>
            <Box className={classes.container}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        label='Nome completo'
                        name='name'
                        fullWidth
                        className={classes.marginTopBottom}
                        error={!!error.name}
                        helperText={error.name}
                        value={values.name}
                        onChange={handleChange}
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
            </Box>
            <Dialog
                type={dialog.type}
                title={dialog.title}
                text={dialog.message}
                open={dialog.open}
                optionOk={handleCloseDialog}
            />
            {isLoading && <Loading />}
        </Body>
    );
}

export default ComponentRegisterUser;