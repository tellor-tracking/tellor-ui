import React from 'react';
import {observer} from 'mobx-react';

function FiltersList({app, filter}) {
    return (
        <div className="ApplicationsFilters-listItem">
            <span className="ApplicationsFilters-listItemName">
                <strong>{filter.filterValue}</strong>
            </span>

            <button onClick={() => app.removeFilter(filter.id)}
                    className="ApplicationsFilters-listItemAction button is-danger">Delete</button>
        </div>
    );
}

export default observer(FiltersList);