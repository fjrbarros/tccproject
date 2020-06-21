import React, { useState, useEffect } from 'react';
import { useStyles } from './Style';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { msgFormatDay } from '../../util/otherfunctions/Index';
// import { decryptData } from '../../util/authentication/Index';
import Toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import Api from '../../util/api/Index';
import Body from '../../components/body/Index';
import TopBar from '../../components/topbar/Index';
import Box from '@material-ui/core/Box';
import ComponentDrawer from '../../components/drawer/Index';
import ComponentCard from '../../components/card/Index';
import Dialog from '../../core/dialog/Index';
import ModalFilter from '../../components/filter/Index';
import CloseProject from '../../components/closeproject/Index';
import ComponentRegisterProject from '../../components/registerproject/Index';
import ComponentRegisterTemplate from '../../components/registertemplate/Index';
import ComponentRegisterUser from '../../components/registeruser/Index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function Dashboard() {

    const history = useHistory();
    const dispatch = useDispatch();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [responseError, setResponseError] = useState('');
    const userName = useSelector(state => state.name);
    const userId = useSelector(state => state.id);
    const [defaultDataProject, setDefaultDataProject] = useState([]);
    const [dataProject, setDataProject] = useState([]);
    const [openModalFilter, setOpenModalFilter] = useState(false);
    const [openModalCloseProject, setOpenModalCloseProject] = useState(false);
    const classes = useStyles(dataProject.length);
    const msgFormat = msgFormatDay(userName);
    const [valueFilter, setValueFilter] = useState(null);
    const [enumFilter, setEnumFilter] = useState(null);
    const [valueClose, setValueClose] = useState(null);
    const [enumClose, setEnumClose] = useState(null);
    const [errorCloseProject, setErrorCloseProject] = useState('');
    const [projectId, setProjectId] = useState(null);
    const [openDialog, setOpenDialog] = useState({
        isLogout: false,
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

    // if (!userId) {
    //     const dataUser = decryptData();
    //     updateStoreDataUser(dataUser.email, dataUser.password);
    //     return;
    // }

    // function updateStoreDataUser(email, password) {
    //     const url = '/usuario/login';
    //     const data = {
    //         email: email,
    //         senha: password,
    //         tokenConfirmacao: ''
    //     };

    //     Api.post(url, data)
    //         .then(resp => {
    //             dispatch({
    //                 type: 'UPDATE_USER',
    //                 name: data.nome ? data.nome : '',
    //                 phone: data.foneContato ? data.foneContato : '',
    //                 email: data.email ? data.email : '',
    //                 id: data.id
    //             });
    //             localStorage.setItem('authenticad', true);
    //         })
    //         .catch(error => {
    //             console.error(error.response.data.message);
    //         });
    // }

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
        Api.get('/projeto', {
            params: {
                usuario: userId
            }
        }).then(resp => {
            setDataProject(resp.data);
            setDefaultDataProject(resp.data);
        }).catch(error => {
            setResponseError(error.response.data.error);
            setOpenDialog({ ...openDialog, isAlert: true });
        });
    }

    function getItemTopBar() {
        return {
            text: msgFormat,
            iconHome: '/dashboard',
            iconRegisterTemplate: '/register-template',
            iconRegisterProject: '/register-project',
            iconMyData: '/my-data',
            iconMenu: true,
            iconFilter: true,
            iconLogOut: true,
            menuDrawer: true
        }
    }

    useEffect(() => {
        executeRequestDataEnum();
        executeRequestProject();
    }, []);

    function Dashboard() {
        return (
            <Box className={classes.dashboard}>
                {
                    dataProject.map(function (project) {
                        return (
                            <ComponentCard
                                key={project.id}
                                title={project.tipoProjeto}
                                description={project.descricao}
                                isAdm={project.userAdmin}
                                percentual={project.percentualConclusao}
                                onClickRemove={() => handleRemoveProject(project)}
                                onClickClose={() => handleCloseProject(project)}
                                onClickEdit={() => handleEditProject(project)}
                                textButton='Abrir'
                            />
                        )
                    })
                }
            </Box>
        );
    }

    function handleLogoutSystem() {
        setOpenDialog({ ...openDialog, isLogout: false });
        localStorage.setItem('authenticad', false);
        history.push('/login');
    }

    function getComponentDialog(type, message, fnClickYes) {
        return (
            <Dialog
                type={type}
                title={type === 'cofirm' ? 'Confirmação' : 'Atenção'}
                text={message}
                open={openDialog.isLogout || openDialog.isRemoveProject || openDialog.isAlert}
                optionOk={resetData}
                optionYes={() => fnClickYes()}
                optionNo={resetData}
            />
        );
    }

    function resetData() {
        setRemoveProject({ id: null, description: '' });
        setOpenDialog({
            isLogout: false,
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
        <Router>
            <Body>
                <TopBar
                    action={getItemTopBar()}
                    onClickLogout={() => setOpenDialog({ ...openDialog, isLogout: true })}
                    onClickDrawer={() => setOpenDrawer(!openDrawer)}
                    onClickFilter={() => setOpenModalFilter(true)}
                />
                <Box className={classes.content}>
                    <Switch>
                        <Route exact path='/dashboard' component={Dashboard} />
                        <Route exact path='/register-project' component={ComponentRegisterProject} />
                        <Route exact path='/register-template' component={ComponentRegisterTemplate} />
                        <Route exact path='/my-data' component={ComponentRegisterUser} />
                    </Switch>
                </Box>
                <ComponentDrawer
                    open={openDrawer}
                    toggleDrawer={toggleDrawer}
                />
            </Body>
            {
                openDialog.isLogout && getComponentDialog(
                    'confirm',
                    'Deseja sair do sistema?',
                    handleLogoutSystem
                )
            }
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
        </Router>
    );
}

export default Dashboard;