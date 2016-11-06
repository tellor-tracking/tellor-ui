import React from 'react';
import {observer} from 'mobx-react';


function Filters({app}) {
    return (
        <div className="EventsHeader-filters">
            <span className="EventsHeader-filter select">
                <select onChange={ev => app.selectFilter(ev.target.value)} name="f" id="f">
                    <option value="none">All versions</option>
                    <option value={app.FILTERS.ADD_FILTER}>Add version filter</option>
                </select>
            </span>

            <span className="EventsHeader-filter select">
                <select onChange={ev => app.selectFilter(ev.target.value)} name="f" id="f">
                    <option value="none">All IPs</option>
                    <option value={app.FILTERS.ADD_FILTER}>Add IP filter</option>
                </select>
            </span>
        </div>
    );
}

export default observer(Filters);