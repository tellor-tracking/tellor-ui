import React from 'react';
import {observer} from 'mobx-react';

function name({name, onClick}) {
    return (
        <span onClick={onClick} className="ApplicationsList-itemName title">
            {name}
        </span>
    );
}

function infoBtn({showSettings}) {
    return (
        <span onClick={showSettings} className="ApplicationsList-infoBtn subtitle">
            Settings
        </span>
    );
}

const InfoBtn = observer(infoBtn);
const Name = observer(name);

function ApplicationsListItem({app}) {
    return (
        <div className="ApplicationsList-item">
            <Name onClick={app.select.bind(app)} name={app.name}/>
            <InfoBtn showSettings={app.showSettings}/>
        </div>
    );
}


export default observer(ApplicationsListItem);