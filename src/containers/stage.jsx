import React from 'react';
import {observer} from 'mobx-react';

import StageEvents from './stageEvents.jsx';
import StageApplications from './stageApplications.jsx';

import Applications from '../components/applications/list/index.jsx';
import ApplicationsSettings from '../components/applications/settings/index.jsx';

@observer
class Stage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Stage">
{/*                {this.props.store.activeApplicationId === null || this.props.store.showSettingsApplicationId !== null ?
                    this.props.store.showSettingsApplicationId !== null ?
                        <ApplicationsSettings {...this.props}/> :
                        <Applications {...this.props}/>
                :
                    <StageEvents {...this.props}/>
                }*/}

                {this.props.children || <Applications {...this.props}/>}
            </div>
        );
    }
}

export default Stage;