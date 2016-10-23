import React from 'react';
import {observer} from 'mobx-react';

import SidePanelHeader from '../components/side-panel/header';

@observer
class SidePanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="SidePanel">
                <SidePanelHeader {...this.props}/>
            </div>
        );
    }
}

export default SidePanel;