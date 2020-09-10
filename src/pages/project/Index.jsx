import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from './Style';
import { Box, AppBar, Tabs, Tab } from '@material-ui/core';
import './Style.css';
import Api from '../../util/api/Index';
import Body from '../../components/body/Index';
import Dialog from '../../core/dialog/Index';
import Loading from '../../components/loading/Index';
import Board, { moveCard } from '@lourenci/react-kanban';
import Chart from '../../components/chart/Index';

function Dashboard(props) {
    const classes = useStyles();
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

    function setDataActivities(data) {
        const todo = [];
        const doing = [];
        const done = [];

        data.map(item => {
            switch (item.estagio) {
                case 'TO_DO':
                    arrayPushData(todo, item);
                    break;
                case 'DOING':
                    arrayPushData(doing, item);
                    break;
                case 'DONE':
                    arrayPushData(done, item);
                    break;
            }
        });

        function arrayPushData(array, item) {
            array.push({ id: item.id, description: item.descricao, state: item.estagio });
        }

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

    function resetData() {
        setDialog({
            open: false,
            message: '',
            type: '',
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
                {...other}
            >
                {
                    value === index &&
                    <Box className={classes.containerTab}>
                        {children}
                    </Box>
                }
            </div>
        );
    }

    const [value, setValue] = useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    };

    function getComponentDialog(type, message, fnClickYes) {
        return (
            <Dialog
                type={type}
                title={type === 'confirm' ? 'Confirmação' : 'Atenção'}
                text={dialog.message}
                open={dialog.open}
                optionOk={resetData}
            />
        );
    }

    return (
        <React.Fragment>
            <Body>
                <AppBar position='static' color='default'>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor='primary'
                        textColor='primary'
                        variant='scrollable'
                        scrollButtons='auto'
                    >
                        <Tab label='Atividades' />
                        <Tab label='Cronograma' />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Board onCardDragEnd={handleCardMove} disableColumnDrag>
                        {columns}
                    </Board>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Chart />
                </TabPanel>
            </Body>
            {isLoading && <Loading />}
            {dialog.open && getComponentDialog('alert')}
        </React.Fragment>
    );
}

export default Dashboard;