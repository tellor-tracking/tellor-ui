import React from 'react';
import {observer} from 'mobx-react';

import ApplicationsList from './applicationsList.jsx';
import ApplicationsCreateNew from './applicationsCreateNew.jsx';


function Applications(props) {

    props.store.deselectActiveApplication();

    return (
        <div className="StageApplications">
            <div className="StageApplications-container">
                <div className="StageApplications-content">
                    <ApplicationsList {...props} />
                    <ApplicationsCreateNew {...props} />
                </div>
            </div>
        </div>

    );
}

export default observer(Applications);