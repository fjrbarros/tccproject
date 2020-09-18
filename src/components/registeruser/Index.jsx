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
import EditIcon from '@material-ui/icons/Edit';
import Modal from '../modal/Index';

function ComponentRegisterUser(props) {
    const classes = useStyles(props);
    const location = useLocation();
    const isNewUser = props.isNewUser;
    const idUser = useSelector(state => state.id);
    const _name = useSelector(state => state.name);
    const _email = useSelector(state => state.email);
    const _phone = useSelector(state => state.phone);
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState({
        editPassword: false
    });
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
        if (location.pathname === '/register-user') return;
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

        const _values = values;
        const errors = {};

        if (!isNewUser) {
            delete _values.password;
            delete _values.confPassword;
        }

        validateForm(_values, (campo, msg) => errors[campo] = msg);
        setError(errors);
        if (Object.keys(errors).length === 0) {
            registerUser();
        }
    }

    function registerUser() {
        const data = {
            email: values.email,
            nome: values.name,
            foneContato: values.phone.replace(/\D/g, '')
        };

        if (isNewUser) {
            data.senha = values.password;

            setIsLoading(true);
            Api.post('/usuario', data)
                .then(() => {
                    fnSuccess();
                })
                .catch(error => {
                    fnError(error);
                });
        } else {
            setIsLoading(true);
            Api.put(`/usuario/${idUser}`, data)
                .then(() => {
                    fnSuccess();
                })
                .catch(error => {
                    fnError(error);
                });
        }
    }

    function fnSuccess() {
        setIsLoading(false);
        resetData();
        Toast.notify('Dados salvos com sucesso.', { duration: 2000 });
    }

    function fnError(error) {
        setIsLoading(false);
        openDialog('alert', error.response.data.message);
    }

    function updatePassword() {
        setIsLoading(true);
        Api.post(`usuario/alteracaoSenha/${idUser}`, { senha: values.password })
            .then(() => {
                fnSuccess();
            })
            .catch(error => {
                fnError(error);
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

    function getPassWordFields() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }

    function getButtonSave() {
        return (
            <Button
                className={classes.saveButton}
                variant='contained'
                color='primary'
                startIcon={<SaveIcon />}
                type='submit'
            >
                Salvar
            </Button>
        )
    }

    function getButtonEdit() {
        return (
            <Button
                className={classes.editPasswordButton}
                variant='contained'
                color='primary'
                startIcon={<EditIcon />}
                onClick={() => setOpenModal({
                    ...openModal,
                    editPassword: true
                })}
            >
                Editar senha
            </Button>
        )
    }

    function getButtons() {
        if (isNewUser) {
            return getButtonSave();
        }

        return (
            <React.Fragment>
                {
                    getButtonEdit()
                }
                {
                    getButtonSave()
                }

            </React.Fragment>
        );
    }

    function handleClickCancel() {
        const errors = {
            ...error,
            password: '',
            confPassword: ''
        };
        setOpenModal({
            ...openModal,
            editPassword: false
        });
        setValues({
            ...values,
            password: '',
            confPassword: ''
        });
        setError(errors);
    }

    function handleClickSave() {
        const errors = {};
        const _values = {
            password: values.password,
            confPassword: values.confPassword
        };

        validateForm(_values, (campo, msg) => errors[campo] = msg);
        setError(errors);
        if (Object.keys(errors).length === 0) {
            updatePassword();
        }
    }

    return (
        <Body>
            <Box className={classes.container}>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit}
                >
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
                    {
                        isNewUser && getPassWordFields()
                    }
                    {
                        getButtons()
                    }
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
            {openModal.editPassword &&
                <Modal
                    open={openModal.editPassword}
                    title='Editar senha'
                    useButtonCancel
                    useButtonSave
                    onClickCancel={handleClickCancel}
                    onClickSave={handleClickSave}
                >
                    {getPassWordFields()}
                </Modal>
            }
        </Body>
    );
}

export default ComponentRegisterUser;