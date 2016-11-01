import React from 'react';
import {observer} from 'mobx-react';


function Filters({application}) {
    return (
        <div className="EventsHeader-filters">
            <span className="select">
                <select name="f" id="f">
                    <option value="none">All versions</option>
                    <option value="none">Add version filter</option>
                </select>
            </span>

            <span className="select">
                <select name="f" id="f">
                    <option value="none">All IPs</option>
                    <option value="none">Add IP filter</option>
                </select>
            </span>
        </div>
    );
}

export default observer(Filters);