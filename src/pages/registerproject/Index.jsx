import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStyles } from './Style';
import Api from '../../util/api/Index';
import TopBar from '../../components/topbar/Index';
import ComponentDrawer from '../../components/drawer/Index';
import Body from '../../components/body/Index';
import Dialog from '../../core/dialog/Index';
import { Box, TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import ComponentDate from '../../core/input/date/Index';

function PageRegisterProject() {

    let history = useHistory();

    const [dialog, setDialog] = useState({
        open: false,
        message: '',
        type: '',
        title: ''
    });

    const [dataTypeProject, setDataTypeProject] = useState([]);

    const classes = useStyles();

    const [optionBaseModel, setOptionBaseModel] = useState([{}]);

    const [valueAutoSelect, setValueAutoSelect] = useState({
        typeProject: { valor: '', descricao: '' },
        baseModel: { valor: '', descricao: '' }
    });

    const [date, setDate] = useState({
        dateStart: new Date(),
        dateEnd: new Date()
    });

    const [disabledBaseModel, setDisabledBaseModel] = useState(true);

    const userId = useSelector(state => state.id);

    function executeRequestGetItensBaseModel(typeProject) {

        const url = `/templateProjeto/${userId}/${typeProject}`;

        Api.get(url)
            .then(resp => {
                if (resp.data.length > 0) setDisabledBaseModel(false);
                setOptionBaseModel(resp.data);
            }).catch(error => { });
    }

    useEffect(() => {
        executeRequestRecoverData();
    }, []);

    function handleCloseDialog() {
        setDialog({
            ...dialog,
            message: '',
            type: '',
            open: false,
            title: ''
        });
    }

    function handleClickOptionYes() {
        handleCloseDialog();
        localStorage.setItem('authenticad', false);
        history.push('/login');
    }

    function handleClickLogout() {
        setDialog({
            ...dialog,
            message: 'Deseja sair do sistema?',
            type: 'confirm',
            open: true,
            title: 'Confirmação'
        });
    }

    const [openDrawer, setOpenDrawer] = useState(false);

    function handleDrawerOpen() {
        setOpenDrawer(true);
    }

    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpenDrawer(open);
    };

    function executeRequestRecoverData() {
        const url = '/dados';

        Api.get(url)
            .then(resp => {
                setDataTypeProject(resp.data[5].valores);
            })
            .catch(error => {
                setDialog({
                    ...dialog,
                    message: error.response.data.message,
                    type: 'alert',
                    open: true,
                    title: 'Atenção'
                });
            });
    }

    return (
        <React.Fragment>
            <TopBar
                textCenter='Castro de projeto'
                iconMenu
                iconHome linkHome='/dashboard'
                iconRegisterTemplate linkRegisterTemplate='/register-template'
                iconRegisterProject linkRegisterProject='/register-project'
                iconMyData linkMyData='/mydata'
                iconLogOut onClickLogout={handleClickLogout}
                menuDrawer onDrawerOpen={handleDrawerOpen}
            />
            <Body topBar='65px' >
                <form className={classes.container} onSubmit={teste}>
                    <Box className={classes.containerCenter}>
                        <TextField
                            className={classes.containerInput}
                            label='Título'
                        />
                        <Autocomplete
                            className={classes.containerInput}
                            options={dataTypeProject}
                            getOptionLabel={option => option.descricao}
                            renderInput={params => <TextField {...params} label="Tipo de projeto" />}
                            name='typeProject'
                            value={valueAutoSelect.typeProject}
                            onChange={(event, newValue) => {
                                setValueAutoSelect({ 
                                    ...valueAutoSelect, 
                                    typeProject: newValue ? newValue : {} 
                                });
                                 if(newValue) executeRequestGetItensBaseModel(newValue.valor);
                                console.log(newValue)
                            }}
                        />
                        <Autocomplete
                            className={classes.containerInput}
                            options={optionBaseModel}
                            getOptionLabel={option => option.descricao}
                            renderInput={params => <TextField {...params} label='Modelo de base' />}
                            disabled={disabledBaseModel}
                            name='baseModel'
                            value={valueAutoSelect.baseModel}
                            onChange={(event, newValue) => {
                                setValueAutoSelect({ 
                                    ...valueAutoSelect, 
                                    baseModel: newValue ? newValue : {} 
                                });
                                console.log(newValue)
                            }}
                        />
                        <Box className={classes.containerDate}>
                            <ComponentDate
                                className={classes.dateStart}
                                label='Data de início'
                                value={date.dateStart}
                                onChange={date => setDate({ ...date, dateStart: date })}
                            />
                            <ComponentDate
                                label='Data de término'
                                value={date.dateEnd}
                                onChange={date => setDate({ ...date, dateEnd: date })}
                            />
                        </Box>
                        <Button
                            className={classes.saveButton}
                            variant='contained'
                            color='primary'
                            startIcon={<SaveIcon />}
                            type='submit'
                        >
                            Salvar
                </Button>
                    </Box>
                </form>
            </Body>
            <ComponentDrawer
                open={openDrawer}
                toggleDrawer={toggleDrawer}
            />
            <Dialog
                type={dialog.type}
                title={dialog.title}
                text={dialog.message}
                open={dialog.open}
                optionOk={handleCloseDialog}
                optionYes={handleClickOptionYes}
                optionNo={handleCloseDialog}
            />
        </React.Fragment>
    );

    function teste(event) {
        event.preventDefault();
        alert('Em desenvolvimento.');
    }
}

export default PageRegisterProject;