import React from 'react';
import {observer} from 'mobx-react';

import {LoadingOverlay} from '../../common/loadingOverlay.jsx';
import Filters from './filters/index.jsx';
import General from './general/index.jsx';

function ApplicationsSettings({store, router, routeParams: {appId}}) {
    if (!store.isInitialApplicationsLoadDone) {
        return <LoadingOverlay />;
    }

    const app = store.getApplication(appId);

    if (!app) {
        return <LoadingOverlay />;
    }

    return (
        <div className="StageApplications">
            <div className="StageApplications-container">
                <div className="ApplicationSettings">
                    <div className="ApplicationSettings-header">
                        <div className="ApplicationSettings-headerLeft">
                            <h3 className="title">{app.name}</h3>
                        </div>

                        <div className="ApplicationSettings-headerRight">
                            <a onClick={router.goBack} className="ApplicationSettings-headerControl">Close</a>
                        </div>
                    </div>

                    <div className="ApplicationSettings-body">
                        <div className="ApplicationSettings-bodySection">
                            <h4 className="ApplicationSettings-bodyHeader title is-4">Info</h4>
                            <hr/>
                            <strong>App key:</strong> {app.id}
                        </div>

                        <div className="ApplicationSettings-bodySection">
                            <h4 className="ApplicationSettings-bodyHeader title is-4">Filters</h4>
                            <hr/>
                            <Filters app={app}/>
                        </div>

                        <div className="ApplicationSettings-bodySection">
                            <h4 className="ApplicationSettings-bodyHeader title is-4">General</h4>
                            <hr/>
                            <General store={store} appId={appId}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(ApplicationsSettings);