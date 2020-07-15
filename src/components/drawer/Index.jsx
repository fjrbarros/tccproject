import React, { useState, useEffect } from 'react';
import { useStyles } from './Style';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Api from '../../util/api/Index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Box, Tooltip } from '@material-ui/core';
import ComponentCard from '../../components/card/Index';
import Dialog from '../../core/dialog/Index';

function ComponentDrawer(props) {

    const classes = useStyles();
    const history = useHistory();
    const userId = useSelector(state => state.id);
    const [dataProject, setDataProject] = useState([]);
    const [dialog, setDialog] = useState({
        open: false,
        message: '',
        type: '',
        title: ''
    });

    function executeRequestProject() {
        Api.get('/projeto', {
            params: {
                usuario: userId
            }
        }).then(resp => {
            setDataProject(resp.data);
        }).catch(error => {
            openDialog('alert', error.response.data.message);
        });
    }

    useEffect(() => {
        executeRequestProject();
    }, []);

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

    function handleOpenProject(project) {
        history.push({
            pathname: '/project',
            state: {
                Refresh: true,
                Project: project
            }
        });
    }

    return (
        <Box>
            <SwipeableDrawer
                open={props.open}
                onClose={props.toggleDrawer(false)}
                onOpen={props.toggleDrawer(true)}
            >
                <Box
                    className={classes.list}
                    role="presentation"
                    onClick={props.toggleDrawer(false)}
                    onKeyDown={props.toggleDrawer(false)}
                >
                    <List>
                        <Tooltip title='Fechar projetos' placement='right'>
                            <ListItem button key={'key'}>
                                <Box className={classes.iconLeftFlex} />
                                <ArrowBackIosIcon />
                            </ListItem>
                        </Tooltip>
                    </List>
                    {
                        dataProject.map(function (project) {
                            project.userAdmin = false;
                            return (
                                <List key={project.id} className={classes.listProject}>
                                    <ListItem 
                                        key={project.id} 
                                        button 
                                        onClick={() => handleOpenProject(project)}
                                        className={classes.listProject}
                                    >
                                        <ComponentCard
                                            key={project.id}
                                            project={project}
                                        />
                                    </ListItem>
                                </List>
                            )
                        })
                    }
                </Box>
            </SwipeableDrawer>
            <Dialog
                type={dialog.type}
                title={dialog.title}
                text={dialog.message}
                open={dialog.open}
                optionOk={handleCloseDialog}
                // optionYes={handleClickOptionYes}
                optionNo={handleCloseDialog}
            />
        </Box>
    )
}

export default ComponentDrawer;