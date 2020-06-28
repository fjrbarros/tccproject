import React, { useState } from 'react';
import { useStyles } from './Style';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StorageIcon from '@material-ui/icons/Storage';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Box, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

function ComponentCard(props) {

    const [hiddenCardEdit, setHiddenCardEdit] = useState(true);

    const { project } = props;

    const objStyle = { 
        percentual: project.percentualConclusao, 
        hiddenCardEdit: hiddenCardEdit,         
        concluded: project.status === 'CONCLUIDO' ? true : false
    };

    const classes = useStyles(objStyle);

    function showMoreOptions() {
        return project.userAdmin && project.status !== 'CONCLUIDO';
    }

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <Box className={classes.rootEdit}>
                    <Typography 
                        className={classes.typCardMoreOpt} 
                        onClick={props.onClickEdit}
                    >
                        <EditIcon className={classes.iconCardMoreOption} />
                        Editar projeto
                    </Typography>
                    <Typography
                        className={classes.typCardMoreOpt}
                        onClick={props.onClickRemove}
                    >
                        <DeleteForeverIcon className={classes.iconCardMoreOption} />
                        Excluir projeto
                    </Typography>
                    <Typography 
                        className={classes.typCardMoreOpt} 
                        onClick={props.onClickClose}
                    >
                        <DoneAllIcon className={classes.iconCardMoreOption} /> 
                        Encerrar projeto
                    </Typography>
                    <Typography
                        className={classes.typCardMoreOpt}
                        onClick={() => setHiddenCardEdit(true)}
                    >
                        <KeyboardBackspaceIcon className={classes.iconCardMoreOption} /> 
                        Voltar
                    </Typography>
                </Box>
                <Box className={classes.cardHeader}>
                    <StorageIcon className={classes.cardIcon} />
                    <Typography
                        color="textSecondary"
                        className={classes.title}
                    >
                        {project.tipoProjeto}
                    </Typography>
                </Box>
                <Box className={classes.cardCenter}>
                    <Typography> {project.descricao} </Typography>
                </Box>
                <Box className={classes.progressBar}>
                    <Box className={classes.progressBarContent}>
                        <Box className={classes.progressBarColor}></Box>
                    </Box>
                    <Box className={classes.progressBarRadius}>
                        <strong>{project.percentualConclusao}%</strong>
                    </Box>
                </Box>
                <Box className={classes.cardBottom}>
                    {
                        showMoreOptions() &&
                        <Tooltip title='Mais opções' placement='right'>
                            <MoreVertIcon
                                className={classes.cardMore}
                                onClick={() => setHiddenCardEdit(false)}
                            />
                        </Tooltip>
                    }
                    <Box className={classes.cardBottomFlex} />
                    <Button
                        size="small"
                        className={classes.buttonCard}
                        onClick={props.onClick}
                    >
                        {props.textButton}
                    </Button>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default ComponentCard;