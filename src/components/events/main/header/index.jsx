import React from 'react';
import {observer} from 'mobx-react';

import EventsSegmentationSelector from './eventsSegmentationSelector.jsx';


function EventsMainSectionHeader({event}) {
    return (
        <header className="EventsMain-header">
            <div className="EventsMain-headerLeft"></div>
            <div className="EventsMain-headerCenter">
                <h3 className="title is-3">{event.name}</h3>
            </div>
            <div className="EventsMain-headerRight">
                <EventsSegmentationSelector event={event} />
            </div>
        </header>
    );
}

export default observer(EventsMainSectionHeader);