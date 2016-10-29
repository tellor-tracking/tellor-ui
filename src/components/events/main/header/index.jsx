import React from 'react';
import {observer} from 'mobx-react';

import EventsSegmentationSelector from './eventsSegmentationSelector.jsx';


function EventsMainSectionHeader({event}) {
    return (
        <header className="EventsHeader">
            <EventsSegmentationSelector event={event} />
        </header>
    );
}

export default observer(EventsMainSectionHeader);