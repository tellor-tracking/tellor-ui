import React from 'react';
import {observer} from 'mobx-react';

function ApplicationsCreateNew({store}) {
    return (
        <div onClick={store.crear} className="ApplicationsCreateNew">
            <input className="ApplicationsCreateNew-input" type="text" placeholder="Application name"/>
            <input className="ApplicationsCreateNew-input" type="text" placeholder="Password (optional)"/>
            <button className="ApplicationsCreateNew-button button is-primary">Create</button>
        </div>
    );
}


export default observer(ApplicationsCreateNew);