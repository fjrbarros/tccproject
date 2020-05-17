import React, { useState } from 'react';
import { useStyles } from './Style';
import { TextField, Box, Typography, Tooltip } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function ComponentContActivity(props) {

    const classes = useStyles();

    const [task, setTask] = useState([]);

    function handleChange(event, index) {
        const copyTask = Object.assign([], task);
        copyTask[index].value = event.target.value;
        setTask(copyTask);
    }

    return (
        <Box id={props.id} className={classes.activity}>
            <TextField label='Descrição da atividade' style={{ width: '85%' }} />
            <Tooltip title='Remover atividade' placement='right'>
                <RemoveCircleIcon
                    className={classes.removeActivity}
                    onClick={props.onClickRemoveActivity}
                />
            </Tooltip>
            <Box className={classes.tasks}>
                <Box className={classes.flex} />
                <Typography variant='h6'>Tarefas</Typography>
                <Tooltip title='Adicionar tarefa' placement='right'>
                    <AddCircleOutlineIcon
                        className={classes.addBoxIcon}
                        onClick={handleClickAddTask}
                    />
                </Tooltip>
            </Box>
            {
                task.map(function (task, index) {
                    return (
                        <Box className={classes.inputTask} key={task.id}>
                            <TextField
                                fullWidth
                                key={task.id}
                                value={task.value}
                                onChange={(e) => handleChange(e, index)}
                                label='Descrição tarefa'
                            />
                            <Tooltip title='Remover tarefa' placement='right'>
                                <DeleteForeverIcon
                                    className={classes.deleteTaskIcon}
                                    onClick={() => onRemoveTask(index)}
                                />
                            </Tooltip>
                        </Box>
                    )
                })
            }
        </Box>
    );

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

}

export default ComponentContActivity;