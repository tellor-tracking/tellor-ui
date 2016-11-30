import React from 'react';
import {observer} from 'mobx-react';


function Stage(props) {
    return (
        <div className="Stage">
            {props.children}
        </div>
    );
}

export default observer(Stage);