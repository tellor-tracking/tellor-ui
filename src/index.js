import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, IndexRedirect, browserHistory} from 'react-router';
import {reaction} from 'mobx';

import './styles/main.scss';
import './styles/main.less';

import Store from './store/index';
import TransportAgent from './transport/transportAgent';

import App from './containers/app.jsx';
import Main from './containers/main.jsx';
import Login from './containers/login.jsx';

import Applications from './components/applications/list/index.jsx';
import ApplicationsSettings from './components/applications/settings/index.jsx';
import StageEvents from './containers/stageEvents.jsx';
import EventsStatsPanels from './components/events/stats/index.jsx';
import EventsOverview from './components/events/overview/index.jsx';


const store = new Store(new TransportAgent('<!--@HOST_SERVER-->'), browserHistory);

function createElement (Component, props) {
    // pass store to all components rendered by router
    return <Component store={store} {...props} />;
}

function selectActiveApp({params: {appId}}) {
    if (store.isInitialApplicationsLoadDone) {
        store.selectApplication(appId);
    } else {
        reaction(() => store.isInitialApplicationsLoadDone, isDone => {
            isDone ? store.selectApplication(appId) : null;
        });
    }
}

render(
    <Router history={browserHistory} createElement={createElement}>
        <Route path="/" component={App}>
            <IndexRedirect to="/app"/>
            <Route path="app" onEnter={store.fetchApplications} component={Main}>
                <IndexRoute component={Applications}/>
                <Route path=":appId/settings" component={ApplicationsSettings}/>
                <Route path=":appId/events" onEnter={selectActiveApp} component={StageEvents}>
                    <IndexRoute component={EventsOverview}/>
                    <Route path=":eventId" component={EventsStatsPanels}/>
                </Route>
            </Route>
            <Login path="login" component={Login}/>
        </Route>
    </Router>, document.getElementById('app'));

