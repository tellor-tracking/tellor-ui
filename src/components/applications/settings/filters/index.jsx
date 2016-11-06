import React from 'react';
import {observer} from 'mobx-react';

import FiltersList from './applicationsSettingsFiltersList.jsx';
import AddFilter from './applicationsSettingsAddFilter.jsx';

function ApplicationsSettingsFilters({app}) {

    return (
        <div className="ApplicationsFilters">
            <FiltersList app={app} />
            <AddFilter app={app} />
        </div>
    );
}

export default observer(ApplicationsSettingsFilters);