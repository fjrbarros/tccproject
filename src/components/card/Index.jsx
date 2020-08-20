import React, { useState } from 'react';
import { useStyles } from './Style';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StorageIcon from '@material-ui/icons/Storage';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Box, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import TimelineIcon from '@material-ui/icons/Timeline';

function ComponentCard(props) {
    const [hiddenCard, setHiddenCard] = useState(true);
    const { project } = props;
    const classes = useStyles(hiddenCard);
    const _typeProject = useSelector(state => state.typeProject);
    const _projectStatus = useSelector(state => state.projectStatus);

    function showMoreOptions() {
        return project.userAdmin && project.status !== 'CONCLUIDO';
    }

    return (
        <React.Fragment>
            <Box className={`${classes.card} ${classes.borderRadius}`}>

                <Box className={`${classes.cardProject} ${classes.borderRadius}`}>
                    <Box className={classes.cardProjectHeader}>
                        <StorageIcon />
                        <Typography>{_typeProject.filter(item => item.valor === project.tipoProjeto)[0].descricao}</Typography>
                    </Box>
                    <Box className={classes.cardProjectCenter}>
                        <Typography>{project.descricao}</Typography>
                        <Typography>Status: {_projectStatus.filter(item => item.valor === project.status)[0].descricao}</Typography>
                    </Box>
                    <Box className={classes.cardProjectBottom}>
                        <Box>
                            {
                                showMoreOptions() &&
                                <Tooltip title='Mais opções' placement='right'>
                                    <MoreVertIcon
                                        className={classes.cardMoreOption}
                                        onClick={() => setHiddenCard(!hiddenCard)}
                                    />
                                </Tooltip>
                            }
                            <Tooltip title='Cronograma' placement='right'>
                                <Link
                                    to={{
                                        pathname: '/graphic',
                                        state: { Project: project }
                                    }}
                                    style={{ color: '#ffffff' }}
                                >
                                    <TimelineIcon className={classes.cardMoreOption} />
                                </Link>
                            </Tooltip>
                        </Box>
                        <Box className={classes.flex} />
                        <Button
                            size='small'
                            onClick={props.onClick}
                        >
                            Abrir
                        </Button>
                    </Box>
                </Box>

                <Box className={`${classes.cardProjectOptions} ${classes.borderRadius}`}>
                    <Typography
                        className={classes.defaultOptionCard}
                        onClick={props.onClickEdit}
                    >
                        <EditIcon className={classes.iconCardMoreOption} />
                        Editar projeto
                    </Typography>

                    <Typography
                        className={classes.defaultOptionCard}
                        onClick={props.onClickRemove}
                    >
                        <DeleteForeverIcon className={classes.iconCardMoreOption} />
                        Excluir projeto
                    </Typography>
                    <Typography
                        className={classes.defaultOptionCard}
                        onClick={props.onClickClose}
                    >
                        <DoneAllIcon className={classes.iconCardMoreOption} />
                        Encerrar projeto
                    </Typography>
                    <Typography
                        className={classes.defaultOptionCard}
                        onClick={() => setHiddenCard(!hiddenCard)}
                    >
                        <KeyboardBackspaceIcon className={classes.iconCardMoreOption} />
                        Voltar
                    </Typography>
                </Box>





                {/*<Box className={classes.rootEdit}>
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
                        onClick={() => setHiddenCard(true)}
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
                                onClick={() => setHiddenCard(false)}
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
                </Box>*/}
            </Box>
        </React.Fragment>
    );
}

export default ComponentCard;