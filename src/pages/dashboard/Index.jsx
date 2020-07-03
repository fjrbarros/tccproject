import React, { useState, useEffect } from 'react';
import { useStyles } from './Style';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import Api from '../../util/api/Index';
import Body from '../../components/body/Index';
import { Box, Tooltip } from '@material-ui/core';
import ComponentDrawer from '../../components/drawer/Index';
import ComponentCard from '../../components/card/Index';
import Dialog from '../../core/dialog/Index';
import ModalFilter from '../../components/filter/Index';
import CloseProject from '../../components/closeproject/Index';
import FilterListIcon from '@material-ui/icons/FilterList';
import Loading from '../../components/loading/Index';

function Dashboard() {

    const history = useHistory();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [responseError, setResponseError] = useState('');
    const userId = useSelector(state => state.id);
    const [defaultDataProject, setDefaultDataProject] = useState([]);
    const [dataProject, setDataProject] = useState([]);
    const [openModalFilter, setOpenModalFilter] = useState(false);
    const [openModalCloseProject, setOpenModalCloseProject] = useState(false);
    const classes = useStyles(dataProject.length);
    const [valueFilter, setValueFilter] = useState(null);
    const [enumFilter, setEnumFilter] = useState(null);
    const [valueClose, setValueClose] = useState(null);
    const [enumClose, setEnumClose] = useState(null);
    const [errorCloseProject, setErrorCloseProject] = useState('');
    const [projectId, setProjectId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showIconFilter, setShowIconFilter] = useState(false);
    const [openDialog, setOpenDialog] = useState({
        isRemoveProject: false,
        isAlert: false
    });
    const [removeProject, setRemoveProject] = useState({
        id: null,
        description: ''
    });
    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        setOpenDrawer(open);
    };

    function executeRequestDataEnum() {
        Api.get('/dados')
            .then(resp => {
                const all = [{ valor: 'TODOS', descricao: 'Todos' }];
                const allValuesFilter = all.concat(resp.data[4].valores);
                setEnumFilter(allValuesFilter);
                setEnumClose(resp.data[1].valores);
            })
            .catch(error => {
                setResponseError(error.response.data.error);
                setOpenDialog({ ...openDialog, isAlert: true });
            });
    }

    function executeRequestProject() {
        setIsLoading(true);
        Api.get('/projeto', {
            params: {
                usuario: userId
            }
        }).then(resp => {
            setDataProject(resp.data);
            setDefaultDataProject(resp.data);
            setShowIconFilter(resp.data.length > 0);
            setIsLoading(false);
        }).catch(error => {
            setResponseError(error.response.data.error);
            setOpenDialog({ ...openDialog, isAlert: true });
            setShowIconFilter(false);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        executeRequestDataEnum();
        executeRequestProject();
    }, []);

    function getComponentDialog(type, message, fnClickYes) {
        return (
            <Dialog
                type={type}
                title={type === 'confirm' ? 'Confirmação' : 'Atenção'}
                text={message}
                open={openDialog.isRemoveProject || openDialog.isAlert}
                optionOk={resetData}
                optionYes={() => fnClickYes()}
                optionNo={resetData}
            />
        );
    }

    function resetData() {
        setRemoveProject({ id: null, description: '' });
        setOpenDialog({
            isRemoveProject: false,
            isAlert: false,
            isCloseProject: false
        });
        setResponseError('');
    }

    function getComponentCloseProject() {
        return (
            <CloseProject
                error={!!errorCloseProject}
                helperText={errorCloseProject}
                open={openModalCloseProject}
                optionOk={onCloseProject}
                optionClose={() => setOpenModalCloseProject(false)}
                onChange={handleChageClose}
                option={enumClose}
                value={valueClose}
            />
        );
    }

    function getComponentFilter() {
        return (
            <ModalFilter
                open={openModalFilter}
                optionSearch={handleClickOptionSearch}
                optionClose={() => setOpenModalFilter(false)}
                onChange={handleChageFilter}
                option={enumFilter}
                value={valueFilter}
            />
        )
    }

    function handleEditProject(project) {
        history.push({
            pathname: '/register-project',
            state: {
                isEdit: true,
                Project: project
            }
        });
    }

    function handleChageFilter(event, newValue) {
        setValueFilter(newValue);
    }

    function handleChageClose(event, newValue) {
        setValueClose(newValue);
    }

    function handleClickOptionSearch() {
        if (!valueFilter || valueFilter.valor === 'TODOS') {
            setDataProject(defaultDataProject);
            setOpenModalFilter(false);
            setValueFilter(null);
            return;
        }

        const newDataProject = defaultDataProject.filter((project) => {
            return project.status === valueFilter.valor;
        });

        setDataProject(newDataProject);
        setValueFilter(null);
        setOpenModalFilter(false);
    }

    function handleCloseProject(project) {
        setProjectId(project.id);
        setOpenModalCloseProject(true);
    }

    function handleRemoveProject(project) {
        setRemoveProject({ id: project.id, description: project.descricao });
        setOpenDialog({ ...openDialog, isRemoveProject: true });
    }

    function onCloseProject() {
        if (!valueClose) {
            setErrorCloseProject('Campo obrigatório!');
            return;
        }

        setErrorCloseProject('');
        setValueClose(false);

        const url = `/projeto/${projectId}/encerramento`;
        const data = {
            motivo: valueClose.valor,
            idUsuario: userId
        };

        Api.post(url, data)
            .then(resp => {
                Toast.notify('Projeto encerrado com sucesso.', { duration: 2000 });
                executeRequestProject();
                setOpenModalCloseProject(false);
            }).catch(error => {
                setResponseError(error.response.data.message);
                setOpenDialog({ ...openDialog, isAlert: true });
            });
    }

    function onRemoveProject() {
        Api.delete(`/projeto/${removeProject.id}`)
            .then(resp => {
                Toast.notify('Projeto removido com sucesso.', { duration: 2000 });
                executeRequestProject();
                resetData();
            }).catch(error => {
                setResponseError(error.response.data.message);
                setOpenDialog({ ...openDialog, isAlert: true });
            });
    }

    return (
        <React.Fragment>
            <Body>
                <Box className={classes.dashboard}>
                    {
                        showIconFilter &&
                        <Box className={classes.containerFilter}>
                            <Box className={classes.flex} />
                            <Tooltip title='Filtrar por status' placement='left'>
                                <FilterListIcon
                                    onClick={() => setOpenModalFilter(true)}
                                    className={classes.iconFilter}
                                />
                            </Tooltip>
                        </Box>
                    }
                    {
                        dataProject.map(function (project) {
                            return (
                                <ComponentCard
                                    key={project.id}
                                    project={project}
                                    // title={project.tipoProjeto}
                                    // description={project.descricao}
                                    // isAdm={project.userAdmin}
                                    // percentual={project.percentualConclusao}
                                    onClickRemove={() => handleRemoveProject(project)}
                                    onClickClose={() => handleCloseProject(project)}
                                    onClickEdit={() => handleEditProject(project)}
                                    textButton='Abrir'
                                />
                            )
                        })
                    }
                </Box>
            </Body>
            <ComponentDrawer
                open={openDrawer}
                toggleDrawer={toggleDrawer}
            />
            {
                openDialog.isRemoveProject && getComponentDialog(
                    'confirm',
                    `Deseja remover o projeto ${removeProject.description}?`,
                    onRemoveProject
                )
            }
            {
                openDialog.isAlert && getComponentDialog(
                    'alert',
                    `${responseError}`,
                    null
                )
            }
            {
                openModalFilter && getComponentFilter()
            }
            {
                openModalCloseProject && getComponentCloseProject()
            }
            {
                isLoading && <Loading />
            }
        </React.Fragment>
    );
}

export default Dashboard;