import React from 'react';
import {observer} from 'mobx-react';
import {LoadingOverlay} from '../../common/loadingOverlay.jsx';

import EventsHeader from './header/index.jsx';
import EventsMain from './main/index.jsx';
import EventsFooter from './footer/index.jsx';


function EventsStatsPanel({store, router, routeParams: {eventId}}) {
    if (!store.activeApplicationId) {
        return <LoadingOverlay />;
    }

    const app = store.getActiveApplication();


    if (app.events.length === 0) {
        return <LoadingOverlay />;
    }

    app.selectEvent(eventId);
    const event = app.getActiveEvent();


    return (
        <div className="StatsPanel">
            <EventsHeader router={router} app={app} />
            <EventsMain event={event} />
            <EventsFooter event={event} />
        </div>
    );
}


export default observer(EventsStatsPanel);