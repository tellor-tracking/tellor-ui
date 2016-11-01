import React from 'react';
import {observer} from 'mobx-react';

import ApplicationsList from './applicationsList.jsx';
import ApplicationsCreateNew from './applicationsCreateNew.jsx';


function Applications() {
    return (
        <div className="StageApplications-container">
            <ApplicationsList {...this.props} />
            <ApplicationsCreateNew {...this.props} />
        </div>
    );
}

export default observer(Applications);