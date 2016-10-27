import React from 'react';
import {observer} from 'mobx-react';

import EventsChartSwitcher from './eventsChartSwitcher.jsx';
import EventsLineChart from './eventsLineChart.jsx';
import EventsBarChart from './eventsBarChart.jsx';


function EventsMain({event}) {
    return (
        <div className="EventsMain">
            <EventsChartSwitcher event={event} />
            {event.chartType === event.CHARTS.LINE ? <EventsLineChart event={event} /> : <EventsBarChart event={event} />}
        </div>
    );
}

export default observer(EventsMain);