import React from 'react';
import {observer} from 'mobx-react';

@observer
class ApplicationSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Stage">
            </div>
        );
    }
}

export default ApplicationSettings;