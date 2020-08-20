import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/login/Index';
import PageRegisterUser from '../pages/registeruser/Index';
import PageDashboard from '../pages/dashboard/Index';
import PageGraphic from '../pages/graphic/Index';
import TopBar from '../components/topbar/Index';
import ComponentRegisterProject from '../components/registerproject/Index';
import ComponentRegisterTemplate from '../components/registertemplate/Index';
import ComponentRegisterUser from '../components/registeruser/Index';
import PageProject from '../pages/project/Index';
import Loading from '../components/loading/Index';

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
    const isLoading = useSelector(state => state.isLoading);

    if (isLoading) {
        return <Loading />
    }

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

    function showTopBar() {
        const pathname = window.location.pathname;

        if (pathname === '/login' || pathname === '/register-user') {
            return false;
        }

        return isAuthenticated;
    }

    return (
        <React.Fragment>
            <BrowserRouter>
                {showTopBar() && <TopBar action={getItemTopBar()} />}
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register-user' component={PageRegisterUser} />
                    <PrivateRoute exact path='/dashboard' Auth={isAuthenticated} component={PageDashboard} />
                    <PrivateRoute path='/register-project' Auth={isAuthenticated} component={ComponentRegisterProject} />
                    <PrivateRoute path='/register-template' Auth={isAuthenticated} component={ComponentRegisterTemplate} />
                    <PrivateRoute path='/my-data' Auth={isAuthenticated} component={ComponentRegisterUser} />
                    <PrivateRoute path='/project' Auth={isAuthenticated} component={PageProject} />
                    <PrivateRoute path='/graphic' Auth={isAuthenticated} component={PageGraphic} />
                    <Route exact path='*' component={() => <Redirect to={{ pathname: '/login' }} />} />
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    )
}

export default Routes;