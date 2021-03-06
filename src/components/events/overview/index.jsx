import React from 'react';
import {observer} from 'mobx-react';

function EventsStatsPanel({store}) {

    const activeApp = store.getActiveApplication();
    return (
        <div className="EventsOverview">
            <div className="EventsOverview-content">
                <h1 className="title is-1">Overview coming soon</h1>
            </div>
        </div>
    );
}


export default observer(EventsStatsPanel);