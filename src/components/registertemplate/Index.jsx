import React, { useState } from 'react';
import { useStyles } from './Style';
import { TextField, Box, Typography, Tooltip } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ComponentContActivity from '../containeractivity/Index';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveButton from '../../core/buttons/savebutton/Index';

function ComponentRegisterTamplate() {
    const classes = useStyles();

    const [values, setValues] = useState({
        description: '',
        typeProject: ''
    });

    const top100Films = [{ title: 'The Shawshank Redemption', year: 1994 }]

    const [activity, setActivity] = useState([]);

    function handleChange(event) {
        setValues({ [event.target.name]: event.target.value });
    }

    return (
        <form className={classes.container} onSubmit={teste}>
            <Box className={classes.containerCenter}>
                <TextField
                    fullWidth
                    value={values.description}
                    onChange={handleChange}
                    name='description'
                    label='Descrição'
                />
                <Autocomplete
                    className={classes.containerInput}
                    options={top100Films}
                    getOptionLabel={option => option.title}
                    renderInput={params => <TextField {...params} label="Tipo de projeto" />}
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
                                <ComponentContActivity
                                    key={container.id}
                                    id={container.id}
                                    onClickRemoveActivity={() => handleClickRemoveActivity(index)}
                                />
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
    );

    function handleClickAddActivity() {
        for (var i = 0; i < activity.length; i++) {
            activity[i].id = i;
        }
        setActivity(activity.concat({ id: activity.length }));
    }

    function handleClickRemoveActivity(index) {
        const copyActivity = Object.assign([], activity);
        copyActivity.splice(index, 1);
        setActivity(copyActivity)
    }

    function teste(event) {
        event.preventDefault();
        alert('Em desenvolvimento.');
    }

}

export default ComponentRegisterTamplate;