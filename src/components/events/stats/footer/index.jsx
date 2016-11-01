import React from 'react';
import {observer} from 'mobx-react';

import EventsQuickStats from './eventsQuickStats.jsx';


function EventsFooter({event}) {
    return (
        <footer className="EventsFooter">
            <EventsQuickStats event={event} />
        </footer>
    );
}

export default observer(EventsFooter);