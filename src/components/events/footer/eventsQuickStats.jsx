import React from 'react';
import {observer} from 'mobx-react';

import EventsTotalCountSection from './eventsTotalCountSection.jsx';



function EventsQuickStats({event}) {
    return (
        <div className="EventsMain-quickStats">
            <nav className="level">
                <div className="level-item has-text-centered">
                    <span className="heading">Count</span>
                    <span className="title">
                        <EventsTotalCountSection event={event} />
                    </span>
                </div>
                <div className="level-item has-text-centered">
                    <span className="heading">last 7 days</span>
                    <span className="title">{`+ 0%`}</span>
                </div>
                <div className="level-item has-text-centered">
                    <span className="heading">last 30 days</span>
                    <span className="title">{`+ 0%`}</span>
                </div>
                <div className="level-item has-text-centered">
                    <span className="heading">last 60 days</span>
                    <span className="title">{`+ 0%`}</span>
                </div>
            </nav>
        </div>
    );
}

export default observer(EventsQuickStats);