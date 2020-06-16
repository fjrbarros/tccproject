import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../util/authentication/Index';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Api from '../util/api/Index';
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

    const userId = useSelector(state => state.id);

    const dispatch = useDispatch();

    if (!userId) decryptData();

    function decryptData() {
        const CryptoJS = require('crypto-js');

        const cookieEmail = getCookie('info-E');
        const cookiePassword = getCookie('info-S');

        const bytesEmail = CryptoJS.AES.decrypt(cookieEmail, 'email');
        const bytesPassword = CryptoJS.AES.decrypt(cookiePassword, 'password');
        const plainTextEmail = bytesEmail.toString(CryptoJS.enc.Utf8);
        const plainTextPassword = bytesPassword.toString(CryptoJS.enc.Utf8);

        if (plainTextEmail.length && plainTextPassword.length) {
            updateStoreDataUser(plainTextEmail, plainTextPassword);
        }
    }

    function getCookie(cname) {
        var name = cname + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }


    function updateStoreDataUser(email, password) {
        const url = '/usuario/login';
        const data = {
            email: email,
            senha: password,
            tokenConfirmacao: ''
        };

        Api.post(url, data)
            .then(resp => {
                updateUserDataReducer(resp.data);
                localStorage.setItem('authenticad', true);
            })
            .catch(error => {
                console.error(error.response.data.message);
            });
    }

    function updateUserDataReducer(data) {
        dispatch({
            type: 'UPDATE_USER',
            name: data.nome ? data.nome : '',
            phone: data.foneContato ? data.foneContato : '',
            email: data.email ? data.email : '',
            id: data.id
        });
    }

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