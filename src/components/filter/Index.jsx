import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './Style';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';
import InputAutoComplete from '../../core/input/autocomplete/Index';

function ComponentFielter(props) {

    const classes = useStyles(props);

    return (
        <Box>
            <Dialog
                open={props.open}
                className={classes.dialog}
            >
                <Box className={classes.dialogHeader}>
                    <DialogTitle className={classes.dialogHeaderTitle}>
                        <Typography> <FilterListIcon className={classes.iconFilter} /></Typography>
                        <Typography className={classes.titleFilter}> Filtrar por status </Typography>
                    </DialogTitle>
                </Box>
                <DialogContent className={classes.dialogContent}>
                    <InputAutoComplete
                        label='Filtrar projeto'
                        name='filter'
                        options={props.option}
                        getOptionLabel={(option) => option.descricao}
                        getOptionSelected={(option, value) => option.descricao === value.descricao}
                        value={props.value}
                        onChange={props.onChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        className={classes.buttonFilter}
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={props.optionSearch}
                    >
                        <SearchIcon className={classes.iconButton} />
                        Pesquisar
                        </Button>
                    <Button
                        className={classes.buttonFilter}
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={props.optionClose}
                    >
                        <CloseIcon className={classes.iconButton} />
                        Fechar
                        </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ComponentFielter;