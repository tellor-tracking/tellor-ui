import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';

import './styles/mains.scss';

import Store from './store/store';
import TransportAgent from './transport/transportAgent';

import AppWrap from './containers/appWrap.jsx';
import App from './containers/app.jsx';
import Login from './containers/login.jsx';


const store = new Store(new TransportAgent('http://localhost:4000'), browserHistory);

function createElement (Component, props) {
    // pass store to all components rendered by router
    return <Component store={store} {...props} />;
}

render(
    <Router history={browserHistory} createElement={createElement}>
        <Route path="/" component={AppWrap}>
            <IndexRedirect to="/app"/>
            <Route onEnter={() => store.fetchApplications()} path="app" component={App}/>
            <Login path="login" component={Login}/>
        </Route>
    </Router>, document.getElementById('app'));

