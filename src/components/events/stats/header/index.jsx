import React from 'react';
import {observer} from 'mobx-react';

import DateRangePicker from './eventsDatePicker.jsx';


function EventsHeader({application}) {
    return (
        <header className="EventsHeader">
            <div className="EventsHeader-left"></div>
            <div className="EventsHeader-right">
                <DateRangePicker app={application} />
            </div>
        </header>
    );
}

export default observer(EventsHeader);