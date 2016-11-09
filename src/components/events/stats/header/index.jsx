import React from 'react';
import {observer} from 'mobx-react';

import DateRangePicker from './eventsDatePicker.jsx';
import Filters from './eventsFilters.jsx';


function EventsHeader({app, router}) {
    return (
        <header className="EventsHeader">
            <div className="EventsHeader-left">
                <Filters app={app} router={router} />
            </div>
            <div className="EventsHeader-right">
                <DateRangePicker app={app} />
            </div>
        </header>
    );
}

export default observer(EventsHeader);