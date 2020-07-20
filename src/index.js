import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { validateLoggedUser } from './util/authentication/Index';
import reducers from './reducers/UserReducer';
import Routes from './routes/Index';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(reducers, devTools);

store.dispatch({
    type: 'UPDATE_USER',
    isLoading: true
});

validateLoggedUser(store);

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);