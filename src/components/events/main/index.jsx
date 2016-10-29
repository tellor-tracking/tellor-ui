import React from 'react';
import {observer} from 'mobx-react';

import EventsChartSwitcher from './eventsChartSwitcher.jsx';
import EventsTotalCountSection from './eventsTotalCountSection.jsx';
import EventsLineChart from './eventsLineChart.jsx';
import EventsBarChart from './eventsBarChart.jsx';


function EventsMain({event}) {
    return (
        <div className="EventsMain">
            <EventsTotalCountSection event={event} />
            <EventsChartSwitcher event={event} />
            {event.chartType === event.CHARTS.LINE ? <EventsLineChart event={event} /> : <EventsBarChart event={event} />}
        </div>
    );
}

export default observer(EventsMain);