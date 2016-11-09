import React from 'react';
import {observer} from 'mobx-react';

import EventsOverview from '../components/events/overview/index.jsx';

@observer
class StageEvents extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {children, store, routeParams: {appId}} = this.props;

        store.selectApplication(appId);
        const app = store.getApplication(appId);

        return (
            <div className="StageEvents">
                {children || <EventsOverview application={app} />}
            </div>
        );
    }
}

export default StageEvents;