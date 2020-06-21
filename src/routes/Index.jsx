import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../util/authentication/Index';
import Login from '../pages/login/Index';
import PageRegisterUser from '../pages/registeruser/Index';
import PageDashboard from '../pages/dashboard/Index';

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
                <Route exact path='/login' component={Login} />
                <Route exact path='/register-user' component={PageRegisterUser} />
                <PrivateRoute exact path='/dashboard' component={PageDashboard} />
                <Route exact path="*" component={() => <Redirect to={{ pathname: '/login' }} />} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;