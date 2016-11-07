import React from 'react';
import {observer} from 'mobx-react';

const isAppVersionFilter = val => val.split('=')[0].toLowerCase() === 'appversion';

function Filter({filter}) {
    return (
        <option value={filter.id}>{filter.filterValue.split('=')[1]}</option>
    );
}


function Filters({app}) {
    return (
        <div className="EventsHeader-filters">
            <span className="EventsHeader-filter select">
                <select onChange={ev => app.selectFilter(ev.target.value, app.FILTERS.VALUES.APP)} name="f" id="f">
                    <option value={''}>All versions</option>
                    {app.eventsFilters.filter(f => isAppVersionFilter(f.filterValue)).map(f => <Filter key={f.id} filter={f} />)}
                    <option value={app.FILTERS.ADD_FILTER}>+ Add version filter</option>
                </select>
            </span>

            <span className="EventsHeader-filter select">
                <select onChange={ev => app.selectFilter(ev.target.value, app.FILTERS.VALUES.IP)} name="f" id="f">
                    <option value={''}>All IPs</option>
                    {app.eventsFilters.filter(f => !isAppVersionFilter(f.filterValue)).map(f => <Filter key={f.id} filter={f} />)}
                    <option value={app.FILTERS.ADD_FILTER}>+ Add IP filter</option>
                </select>
            </span>
        </div>
    );
}

export default observer(Filters);