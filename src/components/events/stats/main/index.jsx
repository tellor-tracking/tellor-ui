import React from 'react';
import {observer} from 'mobx-react';

import EventsMainSectionHeader from './header/index.jsx';
import EventsChartSwitcher from './eventsChartSwitcher.jsx';
import EventsChartWrap from './eventsChartWrap.jsx';


function EventsMain({event}) {
    return (
        <div className="EventsMain">
            <EventsMainSectionHeader event={event} />
            <EventsChartWrap event={event} />
            <EventsChartSwitcher event={event} />
        </div>
    );
}

export default observer(EventsMain);