import React from 'react';
import {observer} from 'mobx-react';

import EventsStatsPanels from '../components/events/stats/index.jsx';
import EventsOverview from '../components/events/overview/index.jsx';

@observer
class StageEvents extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const app = this.props.store.getActiveApplication();
        const activeEvent = app.activeEventId !== null ? app.getActiveEvent() : null;
        return (
            <div className="StageEvents">
                {activeEvent ?
                    <EventsStatsPanels event={activeEvent} application={app} /> :
                    <EventsOverview application={app} />}
            </div>
        );
    }
}

export default StageEvents;