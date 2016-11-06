import React from 'react';
import {observer} from 'mobx-react';

import FilterListItem from './applicationsSettingsFiltersListItem.jsx';

function FiltersList({app}) {
    return (
        <div className="ApplicationsFilters-list">
            {app.eventsFilters.map(f => <FilterListItem key={f.id} app={app} filter={f}/>)}
        </div>
    );
}

export default observer(FiltersList);