import React from 'react';
import { useStyles } from './Style';
import Modal from '@material-ui/core/Modal';
import { Backdrop, Fade, Button, Box, TextField } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

function ModalFilter(props) {

    const classes = useStyles();

    const top100Films = [{ title: 'The Shawshank Redemption', year: 1994 }]

    function handleCloseModal() {
        props.closeModal();
    }

    return (
        <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className={classes.modal}
            open={props.open}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <Box className={classes.container}>
                    <Autocomplete
                        options={top100Films}
                        getOptionLabel={option => option.title}
                        renderInput={params => <TextField {...params} label="Tipo de projeto" />}
                    />
                    <Box className={classes.containerButton}>
                        <Box className={classes.flex} />
                        <Button
                            className={classes.cancelButton}
                            variant='contained'
                            size='small'
                            startIcon={<ClearIcon />}
                            onClick={handleCloseModal}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            size='small'
                            startIcon={<SearchIcon />}
                        >
                            Pesquisar
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default ModalFilter;