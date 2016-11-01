import React from 'react';
import {observer} from 'mobx-react';

function ApplicationsSettings({store}) {
    const app = store.getApplication(store.showSettingsApplicationId);

    return (
        <div className="StageApplications-container">
            <div className="ApplicationSettings">
                <div className="ApplicationSettings-header">
                    <div className="ApplicationSettings-headerLeft">
                        <h2 className="title">{app.name}</h2>
                    </div>

                    <div className="ApplicationSettings-headerRight">
                        <a onClick={app.hideSettings} className="ApplicationSettings-headerControl">Close</a>
                    </div>
                </div>
                <div>
                    App key: {app.id}
                </div>
            </div>
        </div>
    );
}

export default observer(ApplicationsSettings);