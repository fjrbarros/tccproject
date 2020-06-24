import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { msgFormatDay } from '../util/otherfunctions/Index';
import { useDispatch } from 'react-redux';
import Login from '../pages/login/Index';
import PageRegisterUser from '../pages/registeruser/Index';
import PageDashboard from '../pages/dashboard/Index';
import TopBar from '../components/topbar/Index';
import ComponentRegisterProject from '../components/registerproject/Index';
import ComponentRegisterTemplate from '../components/registertemplate/Index';
import ComponentRegisterUser from '../components/registeruser/Index';
import Modal from '../core/dialog/Index';

function PrivateRoute({ component: Component, ...rest }) {

    const { Auth } = rest;

    return (
        <Route {...rest}
            render={props =>
                Auth ?
                    (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    )
            }
        />
    )
}

function Routes() {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const userName = useSelector(state => state.name);
    const isAuthenticated = useSelector(state => state.isAuthenticated);

    function getItemTopBar() {
        return {
            text: msgFormatDay(userName),
            iconHome: '/dashboard',
            iconRegisterTemplate: '/register-template',
            iconRegisterProject: '/register-project',
            iconMyData: '/my-data',
            iconMenu: true,
            iconFilter: true,
            iconLogOut: true,
            menuDrawer: true
        }
    }

    function fnClickYes() {
        setOpenModal(false);
        dispatch({
            type: 'UPDATE_USER',
            name: '',
            phone: '',
            email: '',
            id: null,
            isAuthenticated: false
        });
    }

    function getModal() {
        return (
            <Modal
                type='confirm'
                title='Confirmação'
                text='Deseja sair do sistema?'
                open={openModal}
                optionYes={() => fnClickYes()}
                optionNo={() => setOpenModal(false)}
            />
        );
    }

    return (
        <React.Fragment>
            <BrowserRouter>
                {isAuthenticated && <TopBar onClickLogout={() => setOpenModal(true)} action={getItemTopBar()} />}
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register-user' component={PageRegisterUser} />
                    <PrivateRoute exact path='/dashboard' Auth={isAuthenticated} component={PageDashboard} />
                    <PrivateRoute path='/register-project' Auth={isAuthenticated} component={ComponentRegisterProject} />
                    <PrivateRoute path='/register-template' Auth={isAuthenticated} component={ComponentRegisterTemplate} />
                    <PrivateRoute path='/my-data' Auth={isAuthenticated} component={ComponentRegisterUser} />
                    <Route exact path='*' component={() => <Redirect to={{ pathname: '/login' }} />} />
                </Switch>
            </BrowserRouter>
            {openModal && getModal()}
        </React.Fragment>
    );
}

export default Routes;