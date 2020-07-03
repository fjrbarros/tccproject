import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/login/Index';
import PageRegisterUser from '../pages/registeruser/Index';
import PageDashboard from '../pages/dashboard/Index';
import TopBar from '../components/topbar/Index';
import ComponentRegisterProject from '../components/registerproject/Index';
import ComponentRegisterTemplate from '../components/registertemplate/Index';
import ComponentRegisterUser from '../components/registeruser/Index';

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
    const isAuthenticated = useSelector(state => state.isAuthenticated);

    function getItemTopBar() {
        return {
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

    return (
        <React.Fragment>
            <BrowserRouter>
                {isAuthenticated && <TopBar action={getItemTopBar()} />}
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
        </React.Fragment>
    );
}

export default Routes;