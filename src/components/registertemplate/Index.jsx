import React, { useState, useEffect } from 'react';
import { useStyles } from './Style';
import { TextField, Box, Typography, Tooltip } from '@material-ui/core';
import uniqid from 'uniqid';
import Api from '../../util/api/Index';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveButton from '../../core/buttons/savebutton/Index';
import Body from '../../components/body/Index';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
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

    function handleChangeTask(event, index) {
        const copyTask = Object.assign([], task);
        copyTask[index].value = event.target.value;
        setTask(copyTask);
    }

    function handleClickAddTask() {
        for (var i = 0; i < task.length; i++) {
            task[i].id = i;
        }
        setTask(task.concat({ id: task.length, value: '' }));
    }

    function onRemoveTask(index) {
        const copyTask = Object.assign([], task);
        copyTask.splice(index, 1);
        setTask(copyTask);
    }

    function handleClickAddActivity() {
        setActivity(activity.concat([{
            id: uniqid(),
            valueActivity: 'asdfasfsa',
            tasks: [{
                id: '',
                valueTask: 'aaaaaaaaaa'
            }]
        }]));
    }

    function handleClickRemoveActivity(index) {
        const copyActivity = Object.assign([], activity);
        copyActivity.splice(index, 1);
        setActivity(copyActivity)
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Descrição: ', valueDescription);
        console.log('Tipo projeto: ', valueTypeProject);
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
                            activity.map(function (container, index) {
                                return (
                                    <Box key={container.id} className={classes.activity}>
                                        <TextField
                                            label='Descrição da atividade'
                                            style={{ width: '85%' }}
                                            value={container.valueActivity}
                                        />
                                        <Tooltip title='Remover atividade' placement='right'>
                                            <RemoveCircleIcon
                                                className={classes.removeActivity}
                                                onClick={() => handleClickRemoveActivity(index)}
                                            />
                                        </Tooltip>
                                        <Box className={classes.tasks}>
                                            <Box className={classes.flex} />
                                            <Typography variant='h6'>Tarefas</Typography>
                                            <Tooltip title='Adicionar tarefa' placement='right'>
                                                <AddCircleOutlineIcon
                                                    className={classes.addBoxIconTask}
                                                    onClick={handleClickAddTask}
                                                />
                                            </Tooltip>
                                        </Box>
                                        <Box className={classes.inputTask}>
                                            <TextField
                                                fullWidth
                                                value={container.tasks[index].valueTask}
                                                onChange={(e) => handleChangeTask(e, index)}
                                                label='Descrição tarefa'
                                            />
                                            <Tooltip title='Remover tarefa' placement='right'>
                                                <DeleteForeverIcon
                                                    className={classes.deleteTaskIcon}
                                                    onClick={() => onRemoveTask(index)}
                                                />
                                            </Tooltip>
                                        </Box>
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