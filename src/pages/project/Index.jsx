import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, AppBar, Tabs, Tab } from '@material-ui/core';
import './Style.css';
import Api from '../../util/api/Index';
import Body from '../../components/body/Index';
import Dialog from '../../core/dialog/Index';
import Loading from '../../components/loading/Index';
import Board, { moveCard } from '@lourenci/react-kanban';

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function Dashboard(props) {
    const userId = useSelector(state => state.id);
    const propsLocation = props.history.location;
    const Project = propsLocation.state ? propsLocation.state.Project : null;
    const propRefresh = propsLocation.state ? propsLocation.state.Refresh : false;
    const [isLoading, setIsLoading] = useState(false);
    const [columns, setColumns] = useState({
        columns: [{
            id: 'TODO',
            title: 'to do',
            cards: []
        }, {
            id: 'DOING',
            title: 'doing',
            cards: []
        }, {
            id: 'DONE',
            title: 'done',
            cards: []
        }]
    });
    const [dialog, setDialog] = useState({
        open: false,
        message: '',
        type: '',
        title: ''
    });

    useEffect(() => {
        getActivitiesProject();
    }, []);

    if (propRefresh) getActivitiesProject();

    function getActivitiesProject() {
        if (!Project) return;
        setIsLoading(true);
        propsLocation.state.Refresh = false;

        Api.get(`/projeto/${Project.id}/atividades`)
            .then(resp => {
                setDataActivities(resp.data);
            })
            .catch(error => {
                setIsLoading(false);
                openDialog('alert', error.response.data.message);
            });
    }

    function setDataActivities(dados) {
        const todo = [];
        const doing = [];
        const done = [];

        dados.map(item => {
            switch (item.estagio) {
                case 'TO_DO':
                    todo.push({ id: item.id, description: item.descricao, state: item.estagio });
                    break;
                case 'DOING':
                    doing.push({ id: item.id, description: item.descricao, state: item.estagio });
                    break;
                case 'DONE':
                    done.push({ id: item.id, description: item.descricao, state: item.estagio });
                    break;
            }
        });

        setColumns({
            columns: [{
                id: 'TODO',
                title: 'to do',
                cards: todo
            }, {
                id: 'DOING',
                title: 'doing',
                cards: doing
            }, {
                id: 'DONE',
                title: 'done',
                cards: done
            }]
        });

        setIsLoading(false);
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

    function handleCardMove(_card, source, destination) {
        if (_card.state === destination.toColumnId) {
            updateCard(_card, source, destination);
        } else {
            requestUpdateCard(_card, source, destination)
        }
    }

    function requestUpdateCard(_card, source, destination) {
        const url = `projeto/${Project.id}/atividade/${_card.id}/estagio`;
        const data = {
            estagioDestino: destination.toColumnId,
            idUsuario: userId
        };

        setIsLoading(true);
        Api.post(url, data)
            .then(resp => {
                updateCard(_card, source, destination)
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                openDialog('alert', error.response.data.message);
            });
    }

    function updateCard(_card, source, destination) {
        _card.state = destination.toColumnId;
        const updatedBoard = moveCard(columns, source, destination);
        setColumns(updatedBoard);
    }

    function TabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box p={3}>
                <Typography>{children}</Typography>
            </Box>
            )}
        </div>
        );
    }

  TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.any.isRequired,
      value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
      return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
        <React.Fragment>
            <Body>
                <div className={classes.root}>
                  <AppBar position='static' color='default'>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor='primary'
                      textColor='primary'
                      variant='scrollable'
                      scrollButtons='auto'
                      aria-label='scrollable auto tabs example'
                    >
                      <Tab label='Atividades' {...a11yProps(0)} />
                      <Tab label='Cronograma' {...a11yProps(1)} />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                     <Board onCardDragEnd={handleCardMove} disableColumnDrag>
                         {columns}
                     </Board>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Item Two
                  </TabPanel>
                </div>
            </Body>
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
        </React.Fragment>
    );
}

export default Dashboard;