import React from 'react';
import {observer} from 'mobx-react';

import SidePanelEventsListItem from './sidePanelItemListItem.jsx';

function SidePanelEventsList({store}) {
    return (
        <div className="SidePanel-eventsList">
            {store.getActiveApplication().events.map(ev => (
                ev.isVisibleInSidePanel ? <SidePanelEventsListItem key={ev.id} ev={ev} /> : null
                )
            )}
        </div>
    );
}


export default observer(SidePanelEventsList);