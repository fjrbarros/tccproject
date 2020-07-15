import React from 'react';
import { useStyles } from './Style';
import { Box } from '@material-ui/core';
import Body from '../../components/body/Index';
import Container from '../../components/draganddrop/container/Index';
import Card from '../../components/draganddrop/card/Index';

function Dashboard(props) {

    const classes = useStyles();
    const propsLocation = props.history.location;
    const Project = propsLocation.state ? propsLocation.state.Project : null;

    return (
        <React.Fragment>
            <Body>
                <Box className={classes.content}>
                    <Container
                        title='To do'
                        containerId='cont1'
                        headerContainerBackgroun='#00aacc'
                    >
                        <Card
                            draggable='true'
                            cardId='card1'
                        >
                            <h1 style={{margin:'0'}}>Card 1</h1>
                        </Card>
                    </Container>
                    <Container
                        title='Progress'
                        margin='0 10px'
                        containerId='cont2'
                        headerContainerBackgroun='#efc100'
                    >
                        <Card
                            draggable='true'
                            cardId='card2'
                        >
                            <h1 style={{margin:'0'}}>Card 2</h1>
                        </Card>
                    </Container>
                    <Container
                        title='Done'
                        containerId='cont3'
                        headerContainerBackgroun='#00bb00'
                    >
                        <Card
                            draggable='true'
                            cardId='card3'
                        >
                            <h1 style={{margin:'0'}}>Card 3</h1>
                        </Card>
                    </Container>
                </Box>
            </Body>
        </React.Fragment>
    );
}

export default Dashboard;