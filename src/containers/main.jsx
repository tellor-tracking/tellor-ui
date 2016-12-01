import React from 'react';
import {observer} from 'mobx-react';

import SidePanel from '../components/side-panel/index.jsx';
import Stage from './stage.jsx';

@observer
class Main extends React.Component {
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

export default Main;