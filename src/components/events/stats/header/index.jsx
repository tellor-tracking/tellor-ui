import React from 'react';
import {observer} from 'mobx-react';

import DateRangePicker from './eventsDatePicker.jsx';
import Filters from './filters.jsx';


function EventsHeader({application}) {
    return (
        <header className="EventsHeader">
            <div className="EventsHeader-left">
                <Filters app={application} />
            </div>
            <div className="EventsHeader-right">
                <DateRangePicker app={application} />
            </div>
        </header>
    );
}

export default observer(EventsHeader);