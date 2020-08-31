import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, AppBar, Tabs, Tab } from '@material-ui/core';
import './Style.css';
import Api from '../../util/api/Index';
import Body from '../../components/body/Index';
import Dialog from '../../core/dialog/Index';
import Loading from '../../components/loading/Index';
import Board, { moveCard } from '@lourenci/react-kanban';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';

function Dashboard(props) {
    const userId = useSelector(state => state.id);
    const propsLocation = props.history.location;
    const Project = propsLocation.state ? propsLocation.state.Project : null;
    const propRefresh = propsLocation.state ? propsLocation.state.Refresh : false;
    const [isLoading, setIsLoading] = useState(false);


    const [data, setData] = useState([]);
    const [showGraphic, setShowGraphic] = useState(false);



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
        getSchedule();
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

    function getSchedule() {
        if (!Project) return;

        setIsLoading(true);
        Api.get(`/projeto/${Project.id}/cronograma`)
            .then(resp => {
                assembleGraphic(resp);
            })
            .catch(error => {               
                openDialog('alert', error.response.data.message);
                setIsLoading(false);
            });
    }

    function assembleGraphic(resp) {
        const defaultData = [[
            { type: 'string', label: 'Activitie ID' },
            { type: 'string', label: 'Activitie Name' },
            { type: 'string', label: 'Resource' },
            { type: 'date', label: 'Start Date' },
            { type: 'date', label: 'End Date' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' },
        ]];

        resp.data.atividades.map(item => {
            item.atividades.map(item => {
                var splitStartDate = null;
                var splitEndDate = null;
                var startDate = null;
                var endDate = null;

                if (item.dataInicio && item.dataTermino) {
                    splitStartDate = item.dataInicio.split('/');
                    splitEndDate = item.dataTermino.split('/');
                    startDate = new Date(`${splitStartDate[2]}/${splitStartDate[1]}/${splitStartDate[0]}`);
                    endDate = new Date(`${splitEndDate[2]}/${splitEndDate[1]}/${splitEndDate[0]}`);
                } else {
                    splitStartDate = item.dataPrevistaInicio.split('/');
                    splitEndDate = item.dataPrevistaTermino.split('/');
                    startDate = new Date(`${splitStartDate[2]}/${splitStartDate[1]}/${splitStartDate[0]}`);
                    endDate = new Date(`${splitEndDate[2]}/${splitEndDate[1]}/${splitEndDate[0]}`);
                }

                defaultData.push([
                    item.id,
                    item.descricao,
                    item.estagio,
                    startDate,
                    endDate,
                    null,
                    item.percentualConclusao,
                    null,
                ]);
            });
        });
        setData(defaultData);
        setIsLoading(false);
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
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function getComponentDialog(type, message, fnClickYes) {
        return (
            <Dialog
                type={type}
                title={type === 'confirm' ? 'Confirmação' : 'Atenção'}
                text={openDialog.message}
                open={openDialog.isAlert}
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
                    <Chart
                        width={'100%'}
                        height={'100%'}
                        chartType='Gantt'
                        loader={<Loading />}
                        data={data}
                        options={{
                            height: '100%',
                            gantt: {
                                trackHeight: 30,
                            },
                        }}
                        rootProps={{ 'data-testid': '2' }}
                    />
                  </TabPanel>
                </Body>
            {isLoading && <Loading />}
            { openDialog.isAlert && getComponentDialog('alert') }
        </React.Fragment>
    );
}

export default Dashboard;