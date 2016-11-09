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
        <span onClick={onClick} className="ApplicationsList-infoBtn fa fa-2x fa-cog">
            </span>
    );
}

const InfoBtn = observer(infoBtn);
const Name = observer(name);

function ApplicationsListItem({app, router}) {
    return (
        <div className="ApplicationsList-item">
            <Name onClick={() => router.push(`/app/${app.id}/events`)} name={app.name}/>
            <InfoBtn onClick={() => router.push(`/app/${app.id}/settings`)}/>
        </div>
    );
}


export default observer(ApplicationsListItem);