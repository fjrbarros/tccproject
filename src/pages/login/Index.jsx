import React, { useState } from 'react';
import { useStyles, CustomButton } from './Styles';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { validateForm } from '../../util/validate/Index';
import { useHistory } from 'react-router-dom';
import Api from '../../util/api/Index';
import { IconButton, InputAdornment, TextField, Box } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Logo from '../../assets/logo.png';
import ModalRecuverPassword from '../../components/recuverpassword/Index';
import Dialog from '../../core/dialog/Index';

function PageLogin() {

    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);

    let history = useHistory();

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        email: '',
        password: ''
    });

    const [openDialog, setOpenDialog] = useState(false);

    const [textDialog, setTextDialog] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [submited, setSubmited] = useState(false);

    const classes = useStyles();

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
            localStorage.removeItem('authenticad');
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

        Api.post(url, data)
            .then(resp => {
                updateUserDataReducer(resp.data);
                localStorage.setItem('authenticad', true);
                history.push('/dashboard');
            })
            .catch(error => {
                setTextDialog(error.response.data.message);
                setOpenDialog(true);
            });
    }

    function updateUserDataReducer(data) {
        dispatch({
            type:'UPDATE_USER', 
            name: data.nome,
            phone: data.foneContato,
            email: data.email,
            id: data.id
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
                    <a href="https://ararangua.ufsc.br" target="_blank" rel="noopener noreferrer">
                        <img className={classes.logo} src={Logo} alt="" />
                    </a>
                </Box>
                <Box className={classes.formCenter}>
                    <TextField
                        className={classes.textFieldEmail}
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
                        className={classes.textFieldPassword}
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
                                <InputAdornment position="end">
                                    <IconButton
                                        className={classes.inputProps}
                                        aria-label="toggle password visibility"
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
                    <Box><Link to="/register"> Não é cadastrado? </Link></Box>
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
                text= {textDialog}
                open={openDialog}
                optionOk={handleClickOptionOk}
            />
        </Box>
    );
}

export default PageLogin;