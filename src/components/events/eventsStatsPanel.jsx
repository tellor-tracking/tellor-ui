import React from 'react';
import {observer} from 'mobx-react';

import EventsHeader from './header/index.jsx';
import EventsMain from './main/index.jsx';


function EventsStatsPanel({event, application}) {
    return (
        <div className="StatsPanel container">
            <EventsHeader application={application} />
            <EventsMain event={event} />
        </div>
    );
}


export default observer(EventsStatsPanel);