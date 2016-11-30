import React from 'react';
import {observer} from 'mobx-react';


function StageEvents() {
    return (
        <div className="StageEvents">
            {this.props.children}
        </div>
    );
}
export default observer(StageEvents);