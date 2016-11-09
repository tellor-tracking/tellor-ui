import React from 'react';
import {observer} from 'mobx-react';

function SidePanelHeader({store, router}) {
    const title = store.getActiveApplication().name;

    return (
        <div onClick={() => router.push(`/app`)} className="SidePanel-header">
            <h3 className="title">{title}</h3>
        </div>
    );
}

export default observer(SidePanelHeader);