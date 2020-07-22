import React, { useEffect, useState } from 'react';
import { useStyles } from './Style';
import { Box } from '@material-ui/core';
import Api from '../../util/api/Index';
import Body from '../../components/body/Index';
import Container from '../../components/draganddrop/container/Index';
import Card from '../../components/draganddrop/card/Index';
import Dialog from '../../core/dialog/Index';
import Loading from '../../components/loading/Index';

function Dashboard(props) {
    const classes = useStyles();
    const propsLocation = props.history.location;
    const Project = propsLocation.state ? propsLocation.state.Project : null;
    const propRefresh = propsLocation.state ? propsLocation.state.Refresh : false;
    const [isLoading, setIsLoading] = useState(false);
    const [activities, setActivities] = useState({
        to_do: [],
        doing: [],
        done: []
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

    if(propRefresh) getActivitiesProject();

    function getActivitiesProject() {
        if (!Project) return;
        setIsLoading(true);
        propsLocation.state.Refresh = false;

        setActivities({
            ...activities,
            to_do: [],
            doing: [],
            done: []
        });

        Api.get(`/projeto/${Project.id}/atividades`)
            .then(resp => {
                if (!resp.data.length) {
                    setIsLoading(false);
                    return;
                } 
                setActivities({
                    ...activities,
                    to_do: resp.data.filter(item => item.estagio === 'TO_DO'),
                    doing: resp.data.filter(item => item.estagio === 'DOING'),
                    done: resp.data.filter(item => item.estagio === 'DONE')
                });
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                openDialog('alert', error.response.data.message);
            });
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

    return (
        <React.Fragment>
            <Body>
                <Box className={classes.content}>
                    <Container
                        title='To do'
                        containerId='cont1'
                        headerContainerBackgroun='#00aacc'
                        border='1.2px solid #00d4ff'
                    >
                        {
                            activities.to_do.map(activity => {
                                return (
                                    <Card
                                        key={activity.id}
                                        draggable='true'
                                        cardId={activity.id}
                                    >
                                        <h3 style={{ margin: '0' }}>{activity.descricao}</h3>
                                    </Card>
                                )
                            })
                        }
                    </Container>
                    <Container
                        title='Doing'
                        margin='0 10px'
                        containerId='cont2'
                        headerContainerBackgroun='#efc100'
                        border='1.2px solid #fbcb00'
                    >
                        {
                            activities.doing.map(activity => {
                                return (
                                    <Card
                                        key={activity.id}
                                        draggable='true'
                                        cardId={activity.id}
                                    >
                                        <h3 style={{ margin: '0' }}>{activity.descricao}</h3>
                                    </Card>
                                )
                            })
                        }
                    </Container>
                    <Container
                        title='Done'
                        containerId='cont3'
                        headerContainerBackgroun='#00bb00'
                        border='1.2px solid #00bb00'
                    >
                        {
                            activities.done.map(activity => {
                                return (
                                    <Card
                                        key={activity.id}
                                        draggable='true'
                                        cardId={activity.id}
                                    >
                                        <h3 style={{ margin: '0' }}>{activity.descricao}</h3>
                                    </Card>
                                )
                            })
                        }
                    </Container>
                </Box>
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