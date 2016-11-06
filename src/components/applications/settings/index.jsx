import React from 'react';
import {observer} from 'mobx-react';

import Filters from './filters/index.jsx';

function ApplicationsSettings({store}) {
    const app = store.getApplication(store.showSettingsApplicationId);

    return (
        <div className="StageApplications-container">
            <div className="ApplicationSettings">
                <div className="ApplicationSettings-header">
                    <div className="ApplicationSettings-headerLeft">
                        <h3 className="title">{app.name}</h3>
                    </div>

                    <div className="ApplicationSettings-headerRight">
                        <a onClick={app.hideSettings} className="ApplicationSettings-headerControl">Close</a>
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

                </div>
            </div>
        </div>
    );
}

export default observer(ApplicationsSettings);