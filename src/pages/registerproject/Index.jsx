import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStyles } from './Style';
import { validateForm } from '../../util/validate/Index';
import { format } from "date-fns";
import { Box, TextField, Button, Typography, Tooltip } from '@material-ui/core';
import Toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import Api from '../../util/api/Index';
import TopBar from '../../components/topbar/Index';
import ComponentDrawer from '../../components/drawer/Index';
import Body from '../../components/body/Index';
import Dialog from '../../core/dialog/Index';
import SaveIcon from '@material-ui/icons/Save';
import ComponentDate from '../../core/input/date/Index';
import InputAutoComplete from '../../core/input/autocomplete/Index';
import Loading from '../../components/loading/Index';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function PageRegisterProject(props) {

    const propsLocation = props.history.location;

    const isEdit = propsLocation.state ? propsLocation.state.isEdit : null;

    const Project = propsLocation.state ? propsLocation.state.Project : null;

    let history = useHistory();

    const classes = useStyles();

    const userId = useSelector(state => state.id);

    const [dataTypeProject, setDataTypeProject] = useState([]);

    const [disabledBaseModel, setDisabledBaseModel] = useState(true);

    const [openDrawer, setOpenDrawer] = useState(false);

    const [dataModelBase, setDataModelBase] = useState(null);

    const [valueTypeProject, setValueTypeProject] = useState(null);

    const [valueModelBase, setValueModelBase] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [values, setValues] = useState({
        titleProject: '',
        dateInit: new Date(),
        dateEnd: new Date()
    });

    const [dialog, setDialog] = useState({
        open: false,
        message: '',
        type: '',
        title: ''
    });

    const [error, setError] = useState({
        titleProject: '',
        typeProject: '',
        dateInit: '',
        dateEnd: ''
    });

    useEffect(() => {
        executeRequestGetDataTypeProject();
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
        openDialog('confirm', 'Deseja sair do sistema?');
    }

    function handleDrawerOpen() {
        setOpenDrawer(true);
    }

    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpenDrawer(open);
    };

    function executeRequestGetDataTypeProject() {
        setIsLoading(true);
        Api.get('/dados')
            .then(resp => {
                setDataTypeProject(resp.data[5].valores);
                if (isEdit) {
                    setDataEditProject(resp.data[5].valores);
                    return;
                }
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                openDialog('alert', error.response.data.message);
            });
    }

    function executeRequestGetItensBaseModel(typeProject) {

        const url = `/templateProjeto/${userId}/${typeProject}`;

        Api.get(url)
            .then(resp => {
                if (resp.data.length > 0) setDisabledBaseModel(false);
                setDataModelBase(resp.data);
            }).catch(error => {
                openDialog('alert', error.response.data.message);
            });
    }

    function handleChange(event) {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    function handleChageTypeProject(event, newValue) {
        setValueTypeProject(newValue);
        if (newValue) executeRequestGetItensBaseModel(newValue.valor);
    }

    function handleChageModelBase(event, newValue) {
        setValueModelBase(newValue);
    }

    function setDataEditProject(data) {
        const newTypeProject = data.filter(item => item.valor === Project.tipoProjeto);
        const dateInitProject = Project.dataInicio.split('/');
        const dateEndProject = Project.dataPrevistaTermino.split('/');
        const newDateInit = new Date(`${dateInitProject[2]}/${dateInitProject[1]}/${dateInitProject[0]}`);
        const newDateEnd = new Date(`${dateEndProject[2]}/${dateEndProject[1]}/${dateEndProject[0]}`);

        setValues({
            ...values,
            titleProject: Project.descricao,
            dateInit: newDateInit,
            dateEnd: newDateEnd
        });

        setValueTypeProject(newTypeProject[0]);
        setIsLoading(false);
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
                <form className={classes.container} onSubmit={subTeste}>
                    <Box className={classes.containerCenter}>
                        <TextField
                            className={classes.containerInput}
                            label='Título'
                            name='titleProject'
                            error={!!error.titleProject}
                            helperText={error.titleProject}
                            value={values.titleProject}
                            onChange={handleChange}
                        />
                        <InputAutoComplete
                            className={classes.containerInput}
                            label='Tipo de projeto'
                            name='typeProject'
                            error={!!error.typeProject}
                            helperText={error.typeProject}
                            options={dataTypeProject}
                            getOptionLabel={(option) => option.descricao}
                            getOptionSelected={(option, value) => option.descricao === value.descricao}
                            value={valueTypeProject}
                            onChange={handleChageTypeProject}
                        />
                        <InputAutoComplete
                            className={classes.containerInput}
                            label='Modelo de base'
                            name='baseModel'
                            options={dataModelBase}
                            getOptionLabel={(option) => option.descricao}
                            getOptionSelected={(option, value) => option.descricao === value.descricao}
                            disabled={disabledBaseModel}
                            value={valueModelBase}
                            onChange={handleChageModelBase}
                        />
                        <Box className={classes.containerDate}>
                            <ComponentDate
                                className={classes.dateStart}
                                label='Data de início'
                                name='dateInit'
                                error={!!error.dateInit}
                                helperText={error.dateInit}
                                value={values.dateInit}
                                onChange={date => setValues({ ...values, dateInit: date })}
                            />
                            <ComponentDate
                                label='Data de término'
                                name='dateEnd'
                                error={!!error.dateEnd}
                                helperText={error.dateEnd}
                                value={values.dateEnd}
                                onChange={date => setValues({ ...values, dateEnd: date })}
                            />
                        </Box>
                        <Box className={classes.addMemberProject}>
                            <Box className={classes.flex}></Box>
                            <Typography className={classes.addMemberProjectTitle}>
                                Adicionar membro
                            </Typography>
                            <Tooltip title='Adicionar membro' placement='bottom'>
                                <AddBoxIcon className={classes.iconAddMemberProject} />
                            </Tooltip>
                        </Box>
                        <Box className={classes.containerMemberProject}>
                            <ul className={classes.listMember}>
                                <li className={classes.itemListMember}>
                                    <Typography
                                        className={classes.itemListDescription}>
                                        Teste
                                    </Typography>
                                    <Tooltip title='Remover membro' placement='bottom'>
                                        <DeleteForeverIcon
                                            className={classes.iconRemoveMember}
                                        />
                                    </Tooltip>
                                </li>
                                <li className={classes.itemListMember}>
                                    <Typography
                                        className={classes.itemListDescription}>
                                        Teste
                                    </Typography>
                                    <Tooltip title='Remover membro' placement='bottom'>
                                        <DeleteForeverIcon
                                            className={classes.iconRemoveMember}
                                        />
                                    </Tooltip>
                                </li>
                                <li className={classes.itemListMember}>
                                    <Typography
                                        className={classes.itemListDescription}>
                                        Teste
                                    </Typography>
                                    <Tooltip title='Remover membro' placement='bottom'>
                                        <DeleteForeverIcon
                                            className={classes.iconRemoveMember}
                                        />
                                    </Tooltip>
                                </li>
                                <li className={classes.itemListMember}>
                                    <Typography
                                        className={classes.itemListDescription}>
                                        Teste
                                    </Typography>
                                    <Tooltip title='Remover membro' placement='bottom'>
                                        <DeleteForeverIcon
                                            className={classes.iconRemoveMember}
                                        />
                                    </Tooltip>
                                </li>
                            </ul>
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
            {isLoading && <Loading />}
        </React.Fragment>
    );

    function subTeste(event) {
        event.preventDefault();
        validateFormRegisterProject();
    }

    function validateFormRegisterProject() {
        const errors = {};
        validateForm(getValuesRegisterProject(), (campo, msg) => errors[campo] = msg);
        setError(errors);
        if (Object.keys(errors).length === 0) {
            saveNewProject();
        }
    }

    function getValuesRegisterProject() {
        return {
            titleProject: values.titleProject,
            typeProject: valueTypeProject,
            dateInit: values.dateInit,
            dateEnd: values.dateEnd
        }
    }

    function saveNewProject() {
        const url = '/projeto';
        const data = {
            descricao: values.titleProject,
            idTemplateProjeto: valueModelBase ? valueModelBase.valor : null,
            tipoProjeto: valueTypeProject ? valueTypeProject.valor : null,
            dataInicio: getDateFormat(values.dateInit),
            dataPrevistaTermino: getDateFormat(values.dateEnd),
            idUsuario: userId
        };

        Api.post(url, data)
            .then(resp => {
                Toast.notify('Dados salvos com sucesso.', { duration: 2000 });
                resetForm();
            })
            .catch(error => {
                openDialog('alert', error.response.data.message);
            });
    }

    function getDateFormat(date) {
        return format(date, 'dd/MM/yyyy');
    }

    function resetForm() {
        setValueTypeProject(null);
        setValueModelBase(null);
        setValues({
            ...values,
            titleProject: '',
            dateInit: new Date(),
            dateEnd: new Date()
        });
    }

    function openDialog(type, message) {
        if (type === 'alert') {
            setDialog({
                ...dialog,
                message: message,
                type: type,
                open: true,
                title: 'Atenção'
            });
        } else if (type === 'confirm') {
            setDialog({
                ...dialog,
                message: message,
                type: type,
                open: true,
                title: 'Confirmação'
            });
        }
    }
}

export default PageRegisterProject;