import React from 'react';
import {observer} from 'mobx-react';


function EventsTotalCountSection({event}) {
    return (
        <div className="EventsTotalCountSection">
            {event.totalCount}
        </div>
    );
}

export default observer(EventsTotalCountSection);