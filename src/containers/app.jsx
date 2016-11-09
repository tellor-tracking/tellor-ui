import React from 'react';
import {observer} from 'mobx-react';

import SidePanel from './sidePanel.jsx';
import Stage from './stage.jsx';

@observer
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Main">
                {this.props.store.activeApplicationId === null ? null : <SidePanel {...this.props}/>}
                <Stage {...this.props}/>
            </div>
        );
    }
}

export default App;