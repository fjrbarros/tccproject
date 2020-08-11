import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Style.css';
import Api from '../../util/api/Index';
import Body from '../../components/body/Index';
import Dialog from '../../core/dialog/Index';
import Loading from '../../components/loading/Index';
import Board, { moveCard } from '@lourenci/react-kanban';

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
        const updatedBoard = moveCard(columns, source, destination);
        setColumns(updatedBoard);
    }

    return (
        <React.Fragment>
            <Body>
                <Board onCardDragEnd={handleCardMove} disableColumnDrag>
                    {columns}
                </Board>
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