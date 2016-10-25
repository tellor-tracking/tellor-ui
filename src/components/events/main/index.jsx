import React from 'react';
import {observer} from 'mobx-react';

import EventsChart from './eventsChart.jsx';


function EventsMain({event}) {
    return (
        <div className="EventsMain">
            <EventsChart event={event} />
        </div>
    );
}

export default observer(EventsMain);