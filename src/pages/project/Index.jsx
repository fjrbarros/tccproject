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
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';

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

    // function getSchedule() {
    //     if (!Project) return;

    //     setIsLoading(true);
    //     Api.get(`/projeto/${Project.id}/cronograma`)
    //         .then(resp => {
    //             assembleGraphic(resp);
    //         })
    //         .catch(error => {
    //             setDialog('alert', error.response.data.message);
    //             setIsLoading(false);
    //         });
    // }

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
                id={`scrollable-auto-tabpanel-${index}`}
                aria-labelledby={`scrollable-auto-tab-${index}`}
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
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
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
                    <Chart
                        width={'100%'}
                        height={350}
                        chartType="Calendar"
                        loader={<div>Loading Chart</div>}
                        data={[
                            [{ type: 'date', id: 'Date' }, { type: 'number', id: 'teste' }],
                            [new Date(2012, 3, 13), 1],
                            [new Date(2012, 4, 15), 2]
                        ]}
                        options={{
                            title: 'Cronograma atividades',
                            calendar: {
                                daysOfWeek: 'DSTQQSS',
                                underYearSpace: 10,
                                underMonthSpace: 16,
                                monthLabel: {
                                    fontName: 'Times-Roman',
                                    fontSize: 15,
                                    color: '#0026f7',
                                    bold: true,
                                    italic: true
                                },
                                yearLabel: {
                                    fontName: 'Times-Roman',
                                    fontSize: 15,
                                    color: '#0026f7',
                                    bold: true,
                                    italic: true
                                },
                                monthOutlineColor: {
                                    stroke: '#0026f7',
                                    strokeOpacity: 0.8,
                                    strokeWidth: 2
                                }
                            }
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </TabPanel>
            </Body>
            {isLoading && <Loading />}
            {dialog.open && getComponentDialog('alert')}
        </React.Fragment>
    );
}

export default Dashboard;