import React from 'react';
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { Route, Switch, Router } from 'react-router-dom';
import App from './App';
import history from './history';
import { spotifyAuthorizeUrl, spofifyClient, responseType, redirect_uri } from './env';

const spotifyLoginUrl = `${spotifyAuthorizeUrl}?client_id=${spofifyClient}&response_type=${responseType}&redirect_uri=${redirect_uri}`;

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" render={() => <App /> } />
                <Route path='/login' component={() => window.location = spotifyLoginUrl }/>
            </Switch>
        </Router>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
