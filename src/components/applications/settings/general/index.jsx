import React from 'react';
import {observer} from 'mobx-react';
import confirmationModal from '../../../common/passwordConfirmationModal.jsx';


function GeneralSettings({store, appId}) {
    return (
        <div className="ApplicationSettings-general">
            <span>Delete this application:</span>
            <button onClick={() => confirmationModal({onConfirm: pss => store.deleteApplication(appId, pss)})} className="button is-danger">Delete</button>
        </div>
    );
}

export default observer(GeneralSettings);