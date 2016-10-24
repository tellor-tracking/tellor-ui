import React from 'react';
import {observer} from 'mobx-react';


function SidePanelEventsListItem({ev}) {
    return (
        <div className="SidePanelEventsList-item">
            {ev.name}
        </div>
    );
}


export default observer(SidePanelEventsListItem);