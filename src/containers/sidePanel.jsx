import React from 'react';
import {observer} from 'mobx-react';

import SidePanelHeader from '../components/side-panel/header';
import SidePanelSearchBox from '../components/side-panel/searchBox';
import SidePanelEventsList from '../components/side-panel/itemList';

@observer
class SidePanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="SidePanel">
                <SidePanelHeader {...this.props}/>
                <SidePanelSearchBox {...this.props}/>
                <SidePanelEventsList {...this.props}/>
            </div>
        );
    }
}

export default SidePanel;