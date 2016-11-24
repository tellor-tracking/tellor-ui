import React from 'react';
import {observer} from 'mobx-react';
import confirmationModal from '../../../common/passwordConfirmationModal.jsx';

function FiltersListItem({app, filter}) {
    return (
        <div className="ApplicationsFilters-listItem">
            <span className="ApplicationsFilters-listItemName">
                <strong>{filter.filterValue}</strong>
            </span>

            <button onClick={() => confirmationModal({onConfirm: pss => app.removeFilter(filter.id, pss)})}
                    className="ApplicationsFilters-listItemAction button is-danger">Delete</button>
        </div>
    );
}

export default observer(FiltersListItem);