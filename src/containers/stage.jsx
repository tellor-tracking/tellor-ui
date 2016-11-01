import React from 'react';
import {observer} from 'mobx-react';

import StageEvents from './stageEvents.jsx';
import StageApplications from './stageApplications.jsx';

@observer
class Stage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Stage">
                {this.props.store.activeApplicationId === null || this.props.store.showSettingsApplicationId !== null ?
                    <StageApplications {...this.props}/> :
                    <StageEvents {...this.props}/>
                }
            </div>
        );
    }
}

export default Stage;