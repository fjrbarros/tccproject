import React, { useState, useEffect } from 'react';
import { useStyles } from './Style';
import { TextField, Box, Typography, Tooltip } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import uniqid from 'uniqid';
import Api from '../../util/api/Index';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SaveButton from '../../core/buttons/savebutton/Index';
import Body from '../../components/body/Index';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Dialog from '../../core/dialog/Index';
import Loading from '../../components/loading/Index';
import InputAutoComplete from '../../core/input/autocomplete/Index';

function ComponentRegisterTamplate() {

    const classes = useStyles();
    const [enumTypeProject, setEnumTypeProject] = useState([]);
    const [valueTypeProject, setValueTypeProject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [valueDescription, setValueDescription] = useState('');
    const [activity, setActivity] = useState([]);
    const userId = useSelector(state => state.id);
    const _typeProject = useSelector(state => state.typeProject);
    const [dialog, setDialog] = useState({
        open: false,
        message: '',
        type: '',
        title: ''
    });
    const [error, setError] = useState({
        description: '',
        typeProject: ''
    });

    useEffect(() => {
        setEnumTypeProject(_typeProject);
    }, []);

    function handleChange(event) {
        setValueDescription(event.target.value);
    }

    function handleChageTypeProject(event, newValue) {
        setValueTypeProject(newValue);
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
        const errors = {};
        const values = {
            description: valueDescription,
            typeProject: valueTypeProject ? valueTypeProject.valor : null
        };

        validateValues(values, (campo, msg) => errors[campo] = msg);
        setError(errors);

        if (Object.keys(errors).length === 0) {
            saveNewTemplate();
        }
    }

    function validateValues(values, errorFn) {
        let msg;
        if (values.hasOwnProperty('description')) {
            if(!values.description) {
                msg = 'A descrição é obrigatória.'
                errorFn('description', msg);
            }
        }

        if (values.hasOwnProperty('typeProject')) {
            if(!values.typeProject) {
                msg = 'Tipo de projeto é obrigatório.'
                errorFn('typeProject', msg)
            }
        }
    }

    function resetData() {
        setValueDescription('');
        setValueTypeProject('');
        setActivity([]);
    }

    function saveNewTemplate() {
        const data = {
            tipoProjeto: valueTypeProject.valor,
            idUsuario: userId,
            descricao: valueDescription,
            atividades: getActivities()
        };

        setIsLoading(true);
        Api.post('/templateProjeto', data)
            .then(resp => {
                setIsLoading(false);
                resetData();
                Toast.notify('Dados salvos com sucesso.', { duration: 2000 });
            })
            .catch(error => {
                setIsLoading(false);
                openDialog('alert', error.response.data.message);
            });
    }

    function getActivities() {
        const activities = [];

        activity.forEach(item => {
            activities.push({
                descricaoAtividade: item.valueActivity,
                tarefas: item.tasks.map(item => {
                    return {descricao: item.valueTask}
                })
            })
        });

        return activities; 
    }

    return (
        <Body>
            <form className={classes.container} onSubmit={handleSubmit}>
                <Box className={classes.containerCenter}>
                    <TextField
                        fullWidth
                        error={!!error.description}
                        helperText={error.description}
                        value={valueDescription}
                        onChange={handleChange}
                        name='description'
                        label='Descrição'
                    />
                     <InputAutoComplete
                        className={classes.containerInput}
                        label='Tipo de projeto'
                        name='typeProject'
                        error={!!error.typeProject}
                        helperText={error.typeProject}
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