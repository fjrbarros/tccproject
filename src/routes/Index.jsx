import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../util/authentication/Index';
import Login from '../pages/login/Index';
import PageRegister from '../pages/register/Index';
import PageDashboard from '../pages/dashboard/Index';
import PageRegisterTemplate from '../pages/registertemplate/Index';
import PageRegisterProject from '../pages/registerproject/Index';
import PageMydata from '../pages/mydata/Index';

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest}
            render={props =>
                isAuthenticated() ?
                    (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    )
            }
        />
    )
}

function Routes(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path='/login' component={Login} />
                <Route exact={true} path='/register' component={PageRegister} />
                <Route exact={true} path='/register-template' component={PageRegisterTemplate} />
                <Route exact={true} path='/register-project' component={PageRegisterProject} />
                <Route exact={true} path='/mydata' component={PageMydata} />
                <PrivateRoute
                    exact={true}
                    path='/dashboard' component={PageDashboard}
                />
                <Route exact={true} path="*" component={() => <Redirect to={{ pathname: '/login' }} />} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;