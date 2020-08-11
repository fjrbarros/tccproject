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
import Dialog from '../../core/dialog/Index';
import SaveIcon from '@material-ui/icons/Save';
import ComponentDate from '../../core/input/date/Index';
import InputAutoComplete from '../../core/input/autocomplete/Index';
import Loading from '../../components/loading/Index';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ComponentList from '../../components/list/Index';
import ComponentRegisterMember from '../../components/registermember/Index';
import Body from '../../components/body/Index';

function ComponentRegisterProject(props) {
    const propsLocation = props.history.location;
    const isEdit = propsLocation.state ? propsLocation.state.isEdit : null;
    const Project = propsLocation.state ? propsLocation.state.Project : null;
    const history = useHistory();
    const classes = useStyles();
    const userId = useSelector(state => state.id);
    const [dataTypeProject, setDataTypeProject] = useState([]);
    const [disabledBaseModel, setDisabledBaseModel] = useState(true);
    const [dataModelBase, setDataModelBase] = useState(null);
    const [valueTypeProject, setValueTypeProject] = useState(null);
    const [valueModelBase, setValueModelBase] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [openRegisterMember, setOpenRegisterMember] = useState(false);
    const [typeMember, setTypeMember] = useState(null);
    const [dataMemberProject, setDataMemberProject] = useState([]);
    const widthHeaderContainer = dataMemberProject.length > 3 ? 30 : 20;
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

    function getDataProjectEdit(dataTypeProject, typeMember) {
        setIsLoading(true);
        Api.get(`/projeto/${Project.id}`)
            .then(resp => {
                setDataEditProject(resp.data, dataTypeProject, typeMember);
            })
            .catch(error => {
                setIsLoading(false);
                openDialog('alert', error.response.data.message);
            });
    }

    function executeRequestGetDataTypeProject() {
        setIsLoading(true);
        Api.get('/dados')
            .then(resp => {
                setDataTypeProject(resp.data[5].valores);
                setTypeMember(resp.data[2].valores);
                if (isEdit) getDataProjectEdit(resp.data[5].valores, resp.data[2].valores);
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
                setDisabledBaseModel(!resp.data.length > 0);
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

    function setDataEditProject(data, dataTypeProject, typeMember) {
        const newTypeProject = dataTypeProject.filter(item => item.valor === data.tipoProjeto);
        const dateInitProject = data.dataInicio.split('/');
        const dateEndProject = data.dataPrevistaTermino.split('/');
        const newDateInit = new Date(`${dateInitProject[2]}/${dateInitProject[1]}/${dateInitProject[0]}`);
        const newDateEnd = new Date(`${dateEndProject[2]}/${dateEndProject[1]}/${dateEndProject[0]}`);
        const members = data.membros;
        const arrayMembers = [];

        setValues({
            ...values,
            titleProject: data.descricao,
            dateInit: newDateInit,
            dateEnd: newDateEnd
        });

        setValueTypeProject(newTypeProject[0]);

        if (members.length) {
            for (var i = 0; i < members.length; i++) {
                const typeMemberFilter = typeMember.filter(item => item.valor === members[i].perfilMembro);
                arrayMembers.push({
                    id: members[i].id,
                    email: members[i].emailMembro,
                    value: members[i].perfilMembro,
                    description: typeMemberFilter[0].descricao
                })
            }
        }
        setDataMemberProject(arrayMembers);
        setIsLoading(false);
    }

    function handleSubmit(event) {
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
        const url = isEdit ? `/projeto/${Project.id}` : '/projeto';
        const data = {
            descricao: values.titleProject,
            idTemplateProjeto: valueModelBase ? valueModelBase.valor : null,
            tipoProjeto: valueTypeProject ? valueTypeProject.valor : null,
            dataInicio: getDateFormat(values.dateInit),
            dataPrevistaTermino: getDateFormat(values.dateEnd),
            idUsuario: userId,
            membros: getArrayMemberProject()
        };

        if (isEdit) {
            Api.put(url, data)
                .then(resp => {
                    Toast.notify('Dados salvos com sucesso.', { duration: 2000 });
                    resetForm();
                })
                .catch(error => {
                    openDialog('alert', error.response.data.message);
                });

            return;
        }

        Api.post(url, data)
            .then(resp => {
                Toast.notify('Dados salvos com sucesso.', { duration: 2000 });
                resetForm();
            })
            .catch(error => {
                openDialog('alert', error.response.data.message);
            });
    }

    function getArrayMemberProject() {
        const array = [];
        if (!dataMemberProject.length) return array;

        for (var i = 0; i < dataMemberProject.length; i++) {
            array.push({
                emailMembro: dataMemberProject[i].email,
                perfilMembro: dataMemberProject[i].value
            });

            if (isEdit) {
                if (dataMemberProject[i].id) {
                    array.id = dataMemberProject[i].id;
                }
            }
        }

        return array;
    }

    function getDateFormat(date) {
        return format(date, 'dd/MM/yyyy');
    }

    function resetForm() {
        setValueTypeProject(null);
        setValueModelBase(null);
        setDataMemberProject([]);
        setValues({
            ...values,
            titleProject: '',
            dateInit: new Date(),
            dateEnd: new Date()
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


    function handleAddMemberProject(values) {
        const copyDataMembemProject = Object.assign([], dataMemberProject);
        const id = copyDataMembemProject.length;
        copyDataMembemProject.push({
            id: id,
            email: values.email,
            value: values.typeMember.valor,
            description: values.typeMember.descricao
        });
        setDataMemberProject(copyDataMembemProject);
    }

    function handleRemoveMemberProject(idMember) {
        if(isEdit) {
            Api.delete(`/projeto/${Project.id}/membro/${idMember}`)
            .then(resp => {
                Toast.notify('Membro removido com sucesso.', { duration: 2000 });
                setFilterMember(idMember);
            }).catch(error => {
                openDialog('alert', error.response.data.message);
            });
            return;
        }

        setFilterMember(idMember);
    }

    function setFilterMember(idMember) {
        const dataMemberProjectFilter = dataMemberProject.filter(item => item.id !== idMember);
        setDataMemberProject(dataMemberProjectFilter);
    }

    return (
        <React.Fragment>
            <Body>
                <form className={classes.container} onSubmit={handleSubmit}>
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
                                <AddBoxIcon
                                    className={classes.iconAddMemberProject}
                                    onClick={() => setOpenRegisterMember(true)}
                                />
                            </Tooltip>
                        </Box>
                        <Box className={classes.containerMemberProject}>
                            {
                                dataMemberProject.length > 0 &&
                                <Box className={classes.headerContainerMemberProject}>
                                    <Typography
                                        className={classes.textHeaderContainerMember}
                                    > Membro
                                    </Typography>
                                    <Typography
                                        className={classes.textHeaderContainerFunction}
                                    > Função
                                    </Typography>
                                    <Box
                                        style={{ width: `${widthHeaderContainer}px` }}
                                    />
                                </Box>
                            }
                            <Box className={classes.containerCenterMemberProject}>
                                <ComponentList
                                    data={dataMemberProject}
                                    removeMemberProject={handleRemoveMemberProject}
                                />
                            </Box>
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
            <Dialog
                type={dialog.type}
                title={dialog.title}
                text={dialog.message}
                open={dialog.open}
                optionOk={handleCloseDialog}
                optionYes={handleClickOptionYes}
                optionNo={handleCloseDialog}
            />
            <ComponentRegisterMember
                open={openRegisterMember}
                close={() => setOpenRegisterMember(false)}
                typeMember={typeMember}
                addMemberProject={values => handleAddMemberProject(values)}
            />
            {isLoading && <Loading />}
        </React.Fragment>
    );
}

export default ComponentRegisterProject;