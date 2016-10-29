import React from 'react';
import {observer} from 'mobx-react';

import EventsStatsPanels from '../components/events/eventsStatsPanel.jsx';

@observer
class StageEvents extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const app = this.props.store.getActiveApplication();
        const activeEvent = app.activeEventId !== null ? app.getActiveEvent() : null;
        return (
            <div className="StageEvents section">
                {activeEvent ? <EventsStatsPanels event={activeEvent} application={app} />: 'Nothing to see :)'}
            </div>
        );
    }
}

export default StageEvents;