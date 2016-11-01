import React from 'react';
import {observer} from 'mobx-react';

import ApplicationsList from './applicationsList.jsx';
import ApplicationsCreateNew from './applicationsCreateNew.jsx';


function Applications() {
    return (
        <div className="StageApplications-container">
            <div className="StageApplications-content">
                <ApplicationsList {...this.props} />
                <ApplicationsCreateNew {...this.props} />
            </div>
        </div>
    );
}

export default observer(Applications);