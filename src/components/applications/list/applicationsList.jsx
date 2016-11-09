import React from 'react';
import {observer} from 'mobx-react';

import ApplicationsListItem from './applicationsListItem.jsx';

function ApplicationsList({store, router}) {
    return (
        <div className="ApplicationsList">
            <h1 className="title is-1">Select Application</h1>
            <hr/>
            {store.applications.map(app => <ApplicationsListItem key={app.id} app={app} router={router}/>)}
        </div>
    );
}


export default observer(ApplicationsList);