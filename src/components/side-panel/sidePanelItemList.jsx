import React from 'react';
import {observer} from 'mobx-react';
import PS from 'perfect-scrollbar';

import SidePanelEventsListItem from './sidePanelItemListItem.jsx';

class SidePanelEventsList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        PS.initialize(this.list, {
            wheelSpeed: 2,
            wheelPropagation: true,
            minScrollbarLength: 20
        });
    }

    componentDidUpdate() {
        PS.update(this.list);
    }

    render() {

        return (
            <div style={{position: 'relative'}} ref={r=> this.list = r} className="SidePanel-eventsList">
                {this.props.store.getActiveApplication().events.map(ev => (
                        ev.isVisibleInSidePanel ? <SidePanelEventsListItem key={ev.id} ev={ev}/> : null
                    )
                )}
            </div>
        );
    }
}



export default observer(SidePanelEventsList);