import React, { useState, useEffect } from 'react';
import { useStyles } from './Style';
import { TextField, Box, Typography, Tooltip } from '@material-ui/core';
import uniqid from 'uniqid';
import Api from '../../util/api/Index';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveButton from '../../core/buttons/savebutton/Index';
import Body from '../../components/body/Index';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Dialog from '../../core/dialog/Index';
import Loading from '../../components/loading/Index';

function ComponentRegisterTamplate() {

    const classes = useStyles();
    const [task, setTask] = useState([]);
    const [enumTypeProject, setEnumTypeProject] = useState([]);
    const [valueTypeProject, setValueTypeProject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dialog, setDialog] = useState({
        open: false,
        message: '',
        type: '',
        title: ''
    });
    const [valueDescription, setValueDescription] = useState('');

    const [activity, setActivity] = useState([]);

    function handleChange(event) {
        setValueDescription(event.target.value);
    }

    function handleChageTypeProject(event, newValue) {
        setValueTypeProject(newValue);
    }

    useEffect(() => {
        getDataEnumTypeProject();
    }, []);

    function getDataEnumTypeProject() {
        setIsLoading(true);
        Api.get('/dados')
            .then(resp => {
                setEnumTypeProject(resp.data[5].valores);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                openDialog('alert', error.response.data.message);
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

    function handleCloseDialog() {
        setDialog({
            ...dialog,
            message: '',
            type: '',
            open: false,
            title: ''
        });
    }

    function handleChangeTask(event, containerId, taskId) {
        const copyActivity = Object.assign([], activity);
        const container = copyActivity.filter(activity => activity.id === containerId);
        const task = container[0].tasks.filter(task => task.id === taskId);

        task[0].valueTask = event.target.value;
        setActivity(copyActivity);
    }

    function handleClickAddTask(containerId) {
        const copyActivity = Object.assign([], activity);
        const container = copyActivity.filter(activity => activity.id === containerId);

        if (!container[0]) return;

        container[0].tasks.push({
            id: uniqid(),
            valueTask: ''
        });

        setActivity(copyActivity);
    }

    function onRemoveTask(containerId, taskId) {
        const copyActivity = Object.assign([], activity);
        const container = copyActivity.filter(activity => activity.id === containerId);
        const taskFilter = container[0].tasks.filter(task => task.id !== taskId);

        container[0].tasks = [];
        container[0].tasks = taskFilter;
        setActivity(copyActivity);
    }

    function handleClickAddActivity() {
        setActivity(activity.concat([{
            id: uniqid(),
            valueActivity: '',
            tasks: []
        }]));
    }

    function handleClickRemoveActivity(containerId) {
        setActivity(activity.filter(activity => activity.id !== containerId));
    }

    function handleChangeDescriptionActivity(event, containerId) {
        const copyActivity = Object.assign([], activity);
        const container = copyActivity.filter(activity => activity.id === containerId);

        container[0].valueActivity = event.target.value;
        setActivity(copyActivity);
    }
    function handleSubmit(event) {
        event.preventDefault();
        console.log('Descrição: ', valueDescription);
        console.log('Tipo projeto: ', valueTypeProject);
        console.log('Atividades: ', activity);
    }

    return (
        <Body>
            <form className={classes.container} onSubmit={handleSubmit}>
                <Box className={classes.containerCenter}>
                    <TextField
                        fullWidth
                        value={valueDescription}
                        onChange={handleChange}
                        name='description'
                        label='Descrição'
                    />
                    <Autocomplete
                        className={classes.containerInput}
                        renderInput={params => <TextField {...params} label="Tipo de projeto" />}
                        name='typeProject'
                        // error={!!error.typeProject}
                        // helperText={error.typeProject}
                        options={enumTypeProject}
                        getOptionLabel={(option) => option.descricao}
                        getOptionSelected={(option, value) => option.descricao === value.descricao}
                        value={valueTypeProject}
                        onChange={handleChageTypeProject}
                    />
                    <Box className={classes.activities}>
                        <Box className={classes.flex} />
                        <Typography variant='h6'>Atividades</Typography>
                        <Tooltip title='Adicionar atividade' placement='bottom'>
                            <AddBoxIcon
                                className={classes.addBoxIcon}
                                onClick={handleClickAddActivity}
                            />
                        </Tooltip>
                    </Box>
                    <Box>
                        {
                            activity.map(function (container) {
                                return (
                                    <Box key={container.id} className={classes.activity}>
                                        <Box style={{ display: 'flex' }}>
                                            <Box className={classes.flex} />
                                            <Tooltip title='Remover atividade' placement='right'>
                                                <CloseIcon
                                                    className={classes.removeActivity}
                                                    onClick={() => handleClickRemoveActivity(container.id)}
                                                />
                                            </Tooltip>
                                        </Box>
                                        <Box style={{ display: 'flex', marginTop: '-15px' }}>
                                            <TextField
                                                label='Descrição da atividade'
                                                fullWidth
                                                onChange={event => handleChangeDescriptionActivity(event, container.id)}
                                                value={container.valueActivity}
                                            />
                                            <Box style={{ width: '47px', height: '0px' }} />
                                        </Box>
                                        <Box className={classes.tasks}>
                                            <Box className={classes.flex} />
                                            <Typography variant='h6'>Tarefas</Typography>
                                            <Tooltip title='Adicionar tarefa' placement='right'>
                                                <AddCircleOutlineIcon
                                                    className={classes.addBoxIconTask}
                                                    onClick={() => handleClickAddTask(container.id)}
                                                />
                                            </Tooltip>
                                        </Box>
                                        {
                                            container.tasks.map((task) => (
                                                <Box className={classes.inputTask} key={task.id}>
                                                    <TextField
                                                        fullWidth
                                                        value={task.valueTask}
                                                        onChange={(event) => handleChangeTask(event, container.id, task.id)}
                                                        label='Descrição tarefa'
                                                    />
                                                    <Tooltip title='Remover tarefa' placement='right'>
                                                        <DeleteForeverIcon
                                                            className={classes.deleteTaskIcon}
                                                            onClick={() => onRemoveTask(container.id, task.id)}
                                                        />
                                                    </Tooltip>
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                )
                            })
                        }
                    </Box>
                    <SaveButton
                        text='Salvar'
                        width='50%'
                        type='submit'
                    ></SaveButton>
                </Box>
            </form>
            <Dialog
                type={dialog.type}
                title={dialog.title}
                text={dialog.message}
                open={dialog.open}
                optionOk={handleCloseDialog}
                // optionYes={handleClickOptionYes}
                optionNo={handleCloseDialog}
            />
            {isLoading && <Loading />}
        </Body>
    );
}

export default ComponentRegisterTamplate;