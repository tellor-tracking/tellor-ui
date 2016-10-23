import React from 'react';
import {observer} from 'mobx-react';

import ApplicationsList from '../components/applications/applicationsList.jsx';
import ApplicationsCreateNew from '../components/applications/applicationsCreateNew.jsx';

@observer
class StageApplications extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="section is-large">
                <div className="StageApplications container">
                    <ApplicationsList {...this.props} />
                    <ApplicationsCreateNew {...this.props} />
                </div>
            </section>
        );
    }
}

export default StageApplications;