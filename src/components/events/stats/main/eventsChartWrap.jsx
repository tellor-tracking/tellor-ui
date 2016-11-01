import React from 'react';
import {observer} from 'mobx-react';

import EventsLineChart from './eventsLineChart.jsx';
import EventsBarChart from './eventsBarChart.jsx';


function EventsChart({event}) {
    return (
        <div className="EventsMain-chartWrap">
            {event.chartType === event.CHARTS.LINE ? <EventsLineChart event={event} /> : <EventsBarChart event={event} />}
        </div>
    );
}

export default observer(EventsChart);