import React from 'react';
import {observer} from 'mobx-react';


function SidePanelEventsListItem({ev, onClick}) {
    return (
        <div onClick={onClick} className="SidePanelEventsListItem">
            {ev.name}
        </div>
    );
}


export default observer(SidePanelEventsListItem);