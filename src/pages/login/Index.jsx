import React, { useState } from 'react';
import { useStyles, CustomButton } from './Styles';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { validateForm } from '../../util/validate/Index';
import { encryptData } from '../../util/authentication/Index';
import { IconButton, InputAdornment, TextField, Box } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Api from '../../util/api/Index';
import Logo from '../../assets/logo.png';
import ModalRecuverPassword from '../../components/recuverpassword/Index';
import Dialog from '../../core/dialog/Index';
import Loading from '../../components/loading/Index';

function PageLogin() {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [textDialog, setTextDialog] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({
        email: '',
        password: ''
    });

    function handleOpenModal() {
        setOpenModal(true);
    }

    function handleCloseModal() {
        setOpenModal(false);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSubmited(true);
        validateFormLogin(true);
    }

    function validateFormLogin(request) {
        const errors = {};
        validateForm(values, (campo, msg) => errors[campo] = msg);
        setError(errors);
        if (request && Object.keys(errors).length === 0) {
            executeRequest();
        }
    }

    function executeRequest() {
        const url = '/usuario/login';
        const data = {
            email: values.email,
            senha: values.password,
            tokenConfirmacao: ''
        };

        setIsloading(true);

        Api.post(url, data)
            .then(resp => {
                updateUserDataReducer(resp.data);
                encryptData(data);
                window.location.pathname = '/dashboard';
                setIsloading(false);
            })
            .catch(error => {
                setIsloading(false);
                setTextDialog(
                    error.response ? error.response.data.message : error.message
                );
                setOpenDialog(true);
            });
    }

    function updateUserDataReducer(data) {
        dispatch({
            type: 'UPDATE_USER',
            name: data.nome ? data.nome : '',
            phone: data.foneContato ? data.foneContato : '',
            email: data.email ? data.email : '',
            id: data.id,
            isAuthenticated: true,
            isLoading: false
        });
        dispatch({
            type: 'UPDATE_AUTHENTICATED',
            isAuthenticated: true
        });
    }

    function handleChange(event) {
        setValues({ ...values, [event.target.name]: event.target.value });
        if (submited) validateFormLogin()
    }

    function handleBlur() {
        if (submited) validateFormLogin()
    }

    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    };

    function handleMouseDownPassword(event) {
        event.preventDefault();
    };

    function handleClickOptionOk() {
        setOpenDialog(false);
        setTextDialog('');
    }

    return (
        <Box className={classes.body}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Box className={classes.formHeader}>
                    <Box>
                        <span> Management system for academic project control </span>
                    </Box>
                    <a href='https://ararangua.ufsc.br' target='_blank' rel='noopener noreferrer'>
                        <img className={classes.logo} src={Logo} alt='' />
                    </a>
                </Box>
                <Box className={classes.formCenter}>
                    <TextField
                        className={classes.textField}
                        label='E-mail'
                        fullWidth
                        name='email'
                        error={!!error.email}
                        helperText={error.email}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                            className: classes.inputProps
                        }}
                        InputLabelProps={{
                            className: classes.inputLabelPropsEmail
                        }}
                    />
                    <TextField
                        className={classes.textField}
                        label='Senha'
                        fullWidth
                        name='password'
                        error={!!error.password}
                        helperText={error.password}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={showPassword ? 'text' : 'password'}
                        InputLabelProps={{
                            className: classes.inputLabelPropsPassword
                        }}
                        InputProps={{
                            className: classes.inputProps,
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        className={classes.inputProps}
                                        aria-label='toggle password visibility'
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <CustomButton
                        fullWidth
                        type='submit'
                    >
                        Entrar
                    </CustomButton>
                </Box>
                <Box className={classes.formBottom}>
                    <Box><Link to='/register-user'> Não é cadastrado? </Link></Box>
                    <Box className={classes.boxRecPassword}>
                        <span onClick={handleOpenModal}
                            className={classes.RecPassword}
                        >
                            Recuperar senha
                        </span>
                    </Box>
                    <small>Versão do sistema 1.0</small>
                </Box>
            </form>
            <ModalRecuverPassword
                open={openModal}
                closeModal={handleCloseModal}
            />
            <Dialog
                type='error'
                title='Erro'
                text={textDialog}
                open={openDialog}
                optionOk={handleClickOptionOk}
            />
            {isLoading && <Loading />}
        </Box>
    );
}

export default PageLogin;