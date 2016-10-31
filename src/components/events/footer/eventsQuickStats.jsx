import React from 'react';
import {observer} from 'mobx-react';

import EventsTotalCountSection from './eventsTotalCountSection.jsx';



function EventsQuickStats({event}) {
    return (
        <div className="EventsMain-quickStats">
            <nav className="level">
                <div className="level-item has-text-centered">
                    <p className="heading">Count</p>
                    <p className="title">
                        <EventsTotalCountSection event={event} />
                    </p>
                </div>
                <div className="level-item has-text-centered">
                    <p className="heading">last 7 days</p>
                    <p className="title">{`+ 0%`}</p>
                </div>
                <div className="level-item has-text-centered">
                    <p className="heading">last 30 days</p>
                    <p className="title">{`+ 0%`}</p>
                </div>
                <div className="level-item has-text-centered">
                    <p className="heading">last 60 days</p>
                    <p className="title">{`+ 0%`}</p>
                </div>
            </nav>
        </div>
    );
}

export default observer(EventsQuickStats);