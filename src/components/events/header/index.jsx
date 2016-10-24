import React from 'react';
import {observer} from 'mobx-react';

import DateRangePicker from './eventsDatePicker.jsx';


function EventsHeader(props) {
    return (
        <header className="EventsHeader">
            <DateRangePicker {...props} />
        </header>
    );
}

export default observer(EventsHeader);