import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './Style';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import InputAutoComplete from '../../core/input/autocomplete/Index';

function ComponentCloseProject(props) {

    const classes = useStyles(props);

    return (
        <Box>
            <Dialog
                open={props.open}
                className={classes.dialog}
            >
                <Box className={classes.dialogHeader}>
                    <DialogTitle className={classes.dialogHeaderTitle}>
                        <Typography>
                            <ErrorOutlineIcon className={classes.iconClose} />
                        </Typography>
                        <Typography className={classes.titleFilter}>
                            Encerrar projeto
                        </Typography>
                    </DialogTitle>
                </Box>
                <DialogContent className={classes.dialogContent}>
                    <InputAutoComplete
                        label='Motivo'
                        name='closeProject'
                        error={props.error}
                        helperText={props.helperText}
                        options={props.option}
                        getOptionLabel={(option) => option.descricao}
                        getOptionSelected={(option, value) => option.descricao === value.descricao}
                        value={props.value}
                        onChange={props.onChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        className={classes.buttonClose}
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={props.optionOk}
                    >
                        <CheckIcon className={classes.iconButton} />
                        Sim
                    </Button>
                    <Button
                        className={classes.buttonClose}
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={props.optionClose}
                    >
                        <CloseIcon className={classes.iconButton} />
                        Não
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ComponentCloseProject;