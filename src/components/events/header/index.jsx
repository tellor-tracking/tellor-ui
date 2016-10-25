import React from 'react';
import {observer} from 'mobx-react';

import DateRangePicker from './eventsDatePicker.jsx';
import EventsSegmentationSelector from './eventsSegmentationSelector.jsx';


function EventsHeader({event}) {
    return (
        <header className="EventsHeader">
            <DateRangePicker event={event} />
            <EventsSegmentationSelector event={event} />
        </header>
    );
}

export default observer(EventsHeader);