import React from 'react';
import {observer} from 'mobx-react';

import SidePanelEventsListItem from './itemListItem.jsx';

function SidePanelEventsList({store}) {
    return (
        <div className="SidePanelEventsList">
            {store.getActiveApplication().events.map(ev => (
                ev.isVisibleInSidePanel ? <SidePanelEventsListItem key={ev.id} ev={ev} /> : null
                )
            )}
        </div>
    );
}


export default observer(SidePanelEventsList);