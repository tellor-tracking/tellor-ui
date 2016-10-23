import React from 'react';
import {observer} from 'mobx-react';

function name({name, onClick}) {
    return (
        <span onClick={onClick} className="ApplicationsList-itemName title">
            {name}
        </span>
    );
}

function infoBtn({onClick}) {
    return (
        <button onClick={onClick} className="ApplicationsList-infoBtn button is-link is-pulled-right">
            {'Info'}
        </button>
    );
}

const InfoBtn = observer(infoBtn);
const Name = observer(name);

function ApplicationsListItem({app}) {
    return (
        <div className="ApplicationsList-item">
            <Name onClick={app.select.bind(app)} name={app.name}/>
            <InfoBtn onClick={app.showInfo.bind(app)} name={app.name}/>
        </div>
    );
}


export default observer(ApplicationsListItem);