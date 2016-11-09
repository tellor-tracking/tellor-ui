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

import ApplicationsSettings from './components/applications/settings/index.jsx';
import StageEvents from './containers/stageEvents.jsx';
import EventsStatsPanels from './components/events/stats/index.jsx';



const store = new Store(new TransportAgent('http://localhost:4000'), browserHistory);

function createElement (Component, props) {
    // pass store to all components rendered by router
    return <Component store={store} {...props} />;
}

render(
    <Router history={browserHistory} createElement={createElement}>
        <Route path="/" component={AppWrap}>
            <IndexRedirect to="/app"/>
            <Route path="app" onEnter={() => store.fetchApplications()} component={App}>
                <Route path=":appId/settings" component={ApplicationsSettings}/>
                <Route path=":appId/events" component={StageEvents}>
                    <Route path=":eventId" component={EventsStatsPanels}/>
                </Route>
            </Route>
            <Login path="login" component={Login}/>
        </Route>
    </Router>, document.getElementById('app'));

