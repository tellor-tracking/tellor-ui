import React from 'react';
import {observer} from 'mobx-react';

import SidePanelHeader from './sidePanelHeader.jsx';
import SidePanelSearchBox from './sidePanelSearchBox.jsx';
import SidePanelEventsList from './sidePanelItemList.jsx';

function SidePanel() {
    return (
        <div className="SidePanel">
            <SidePanelHeader {...this.props}/>
            <SidePanelSearchBox {...this.props}/>
            <SidePanelEventsList {...this.props}/>
        </div>
    );
}

export default observer(SidePanel);