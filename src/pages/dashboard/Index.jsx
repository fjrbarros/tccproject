import React, { useState, useEffect } from 'react';
import { useStyles } from './Style';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Api from '../../util/api/Index';
import Body from '../../components/body/Index';
import TopBar from '../../components/topbar/Index';
import { Box } from '@material-ui/core';
import ComponentDrawer from '../../components/drawer/Index';
import ComponentCard from '../../components/card/Index';
import Dialog from '../../core/dialog/Index';
import ModalFilter from '../../components/filter/Index';


function Dashboard() {

    let history = useHistory();

    const name = useSelector(state => state.name);

    const userId = useSelector(state => state.id);

    const [openDrawer, setOpenDrawer] = useState(false);

    const [dataProject, setDataProject] = useState([]);

    const [dialog, setDialog] = useState({
        open: false,
        message: '',
        type: '',
        title: ''
    });

    const [openModalFilter, setOpenModalFilter] = useState(false);

    const msgFormat = msgFormatDay();

    const classes = useStyles(dataProject.length);

    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpenDrawer(open);
    };

    useEffect(() => {
        executeRequestProjects();
    }, []);

    function executeRequestProjects() {
        const url = '/projeto';

        Api.get(url, {
            params: {
                usuario: userId
            }
        }).then(resp => {
            setDataProject(resp.data);
        }).catch(error => {
            setDialog({
                ...dialog,
                message: error.response.data.message,
                type: 'alert',
                open: true,
                title: 'Atenção'
            });
        });
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

    function handleCloseDialog() {
        setDialog({
            ...dialog,
            message: '',
            type: '',
            open: false,
            title: ''
        });
    }

    function handleDrawerOpen() {
        setOpenDrawer(true);
    }

    function handleClickIconFilter() {
        setOpenModalFilter(true);
    }

    function handleCloseModal() {
        setOpenModalFilter(false);
    }

    function handleClickOptionYes() {
        handleCloseDialog();
        localStorage.setItem('authenticad', false);
        history.push('/login');
    }

    return (
        <React.Fragment>
            <TopBar
                textCenter={msgFormat}
                iconMenu
                iconHome linkHome='/dashboard'
                iconFilter onClickFilter={handleClickIconFilter}
                iconRegisterTemplate linkRegisterTemplate='/register-template'
                iconRegisterProject linkRegisterProject='/register-project'
                iconMyData linkMyData='/mydata'
                iconLogOut onClickLogout={handleClickLogout}
                menuDrawer onDrawerOpen={handleDrawerOpen}
            />
            <Body topBar='65px' >
                <Box className={classes.dashboardCenterCard}>

                    {
                        dataProject.map(function (project) {
                            return (
                                <ComponentCard
                                    key={project.id}
                                    title={project.descricao}
                                    textButton='Abrir'
                                />
                            )
                        })
                    }
                    {/* <ComponentCard
                        title='adsfasfasfsa'
                        textButton='Abrir'
                    />
                    <ComponentCard
                        title='adsfasfasfsa'
                        textButton='Abrir'
                    />
                    <ComponentCard
                        title='adsfasfasfsa'
                        textButton='Abrir'
                    />
                    <ComponentCard
                        title='adsfasfasfsa'
                        textButton='Abrir'
                    /> */}
                </Box>
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
            <ModalFilter
                open={openModalFilter}
                closeModal={handleCloseModal}
            />
        </React.Fragment>
    );

    function msgFormatDay() {
        const msgDay = getMsgDay();
        const arrayName = name.split(' ');

        if (!arrayName.length || arrayName[0] === '') return msgDay;

        return msgDay + ', ' + arrayName[0] + '.';
    }

    function getMsgDay() {
        const date = new Date();
        const hours = date.getHours();;

        if (hours >= 18 && hours < 24) {
            return 'Boa noite';
        }

        else if (hours >= 12 && hours < 18) {
            return 'Boa tarde';
        }

        else if (hours >= 0 && hours < 12) {
            return 'Bom dia';
        }

        return '';
    }
}

export default Dashboard;