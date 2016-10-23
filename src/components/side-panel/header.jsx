import React from 'react';
import {observer} from 'mobx-react';

function SidePanelHeader({domainStore}) {
    const title ='TODO';
    return (
        <div className="SidePanel-Header">
            <h3 className="title">{title}</h3>
        </div>
    );
}

export default observer(SidePanelHeader);