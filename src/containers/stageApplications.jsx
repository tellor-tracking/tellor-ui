import React from 'react';
import {observer} from 'mobx-react';

import Applications from '../components/applications/list/index.jsx';
import ApplicationsSettings from '../components/applications/settings/index.jsx';

@observer
class StageApplications extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="StageApplications">
                {this.props.store.showSettingsApplicationId !== null ?
                    <ApplicationsSettings {...this.props}/> :
                    <Applications {...this.props}/>
                }
            </section>
        );
    }
}

export default StageApplications;