import React from 'react';
import {observer} from 'mobx-react';

function SidePanelHeader({store}) {
    const title = store.getActiveApplication().name;

    return (
        <div className="SidePanel-Header">
            <h3 onClick={store.deselectApplication} className="title">{title}</h3>
        </div>
    );
}

export default observer(SidePanelHeader);