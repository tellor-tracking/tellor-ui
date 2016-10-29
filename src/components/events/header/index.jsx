import React from 'react';
import {observer} from 'mobx-react';

import DateRangePicker from './eventsDatePicker.jsx';


function EventsHeader({application}) {
    return (
        <header className="EventsHeader">
            <DateRangePicker app={application} />
        </header>
    );
}

export default observer(EventsHeader);