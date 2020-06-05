import React, { useState, useEffect } from 'react';
import { useStyles } from './Style';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Api from '../../util/api/Index';
import Body from '../../components/body/Index';
import TopBar from '../../components/topbar/Index';
import Box from '@material-ui/core/Box';
import ComponentDrawer from '../../components/drawer/Index';
import ComponentCard from '../../components/card/Index';
import Dialog from '../../core/dialog/Index';
import ModalFilter from '../../components/filter/Index';

function Dashboard() {

    let history = useHistory();

    const name = useSelector(state => state.name);

    const userId = useSelector(state => state.id);

    const [openDrawer, setOpenDrawer] = useState(false);

    const [defaultDataProject, setDefaultDataProject] = useState([]);

    const [dataProject, setDataProject] = useState([]);

    const [openModalFilter, setOpenModalFilter] = useState(false);

    const [responseError, setResponseError] = useState('');

    const msgFormat = msgFormatDay();

    const classes = useStyles(dataProject.length);

    const [valueFilter, setValueFilter] = useState(null);

    const [enumFilter, setEnumFilter] = useState(null);

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

    useEffect(() => {
        executeRequestDataFilter();
        executeRequestProject();
    }, []);

    function handleDrawerOpen() {
        setOpenDrawer(true);
    }

    function executeRequestDataFilter() {
        Api.get('/dados')
            .then(resp => {
                const all = [{valor: 'TODOS', descricao: 'Todos'}];
                const allValuesFilter = all.concat(resp.data[4].valores);
                setEnumFilter(allValuesFilter);
            })
            .catch(error => {
                openDialog('alert', error.response.data.message);
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
            setResponseError(error.response.data.message);
            setOpenDialog({ ...openDialog, isAlert: true });
        });
    }

    return (
        <React.Fragment>
            <TopBar
                textCenter={msgFormat}
                iconMenu
                iconHome linkHome='/dashboard'
                iconFilter onClickFilter={() => setOpenModalFilter(true)}
                iconRegisterTemplate linkRegisterTemplate='/register-template'
                iconRegisterProject linkRegisterProject='/register-project'
                iconMyData linkMyData='/mydata'
                iconLogOut onClickLogout={() => setOpenDialog({ ...openDialog, isLogout: true })}
                menuDrawer onDrawerOpen={handleDrawerOpen}
            />
            <Body topBar='65px' >
                <Box className={classes.dashboardCenterCard}>

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
                openModalFilter && getComponentFielter()
            }
        </React.Fragment>
    );

    function getComponentFielter() {
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

    function handleChageFilter(event, newValue) {
        setValueFilter(newValue);
    }

    function handleClickOptionSearch() {
        if(!valueFilter || valueFilter.valor === 'TODOS') {
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

    function handleLogoutSystem() {
        setOpenDialog({ ...openDialog, isLogout: false });
        localStorage.setItem('authenticad', false);
        history.push('/login');
    }

    function handleRemoveProject(project) {
        setRemoveProject({ id: project.id, description: project.descricao });
        setOpenDialog({ ...openDialog, isRemoveProject: true });
    }

    function onRemoveProject() {
        Api.delete(`/projeto/${removeProject.id}`)
            .then(resp => {
                executeRequestProject();
                resetData();
            }).catch(error => {
                setResponseError(error.response.data.message);
                setOpenDialog({ ...openDialog, isAlert: true });
            });
    }

    function resetData() {
        setRemoveProject({ id: null, description: '' });
        setOpenDialog({ isLogout: false, isRemoveProject: false, isAlert: false });
        setResponseError('');
    }

    function msgFormatDay() {
        const msgDay = getMsgDay();
        const arrayName = name.split(' ');

        if (!arrayName.length || arrayName[0] === '') return msgDay;

        return msgDay + ', ' + arrayName[0] + '.';
    }

    function getMsgDay() {
        const date = new Date();
        const hours = date.getHours();

        if (hours >= 18 && hours < 24) {
            return 'Boa noite';
        }

        if (hours >= 12 && hours < 18) {
            return 'Boa tarde';
        }

        if (hours >= 0 && hours < 12) {
            return 'Bom dia';
        }

        return '';
    }
}

export default Dashboard;