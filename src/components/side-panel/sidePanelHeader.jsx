import React from 'react';
import {observer} from 'mobx-react';

function SidePanelHeader({store}) {
    const title = store.getActiveApplication().name;

    return (
        <div className="SidePanel-header">
            <h3 onClick={store.deselectActiveApplication} className="title">{title}</h3>
        </div>
    );
}

export default observer(SidePanelHeader);