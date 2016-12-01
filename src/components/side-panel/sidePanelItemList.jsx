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

    selectItem = (id) => {
        this.props.router.push(`/app/${this.props.store.getActiveApplication().id}/events/${id}`);
    };

    render() {

        return (
            <div style={{position: 'relative'}} ref={r=> this.list = r} className="SidePanelEventsList">
                {this.props.store.getActiveApplication().events.map(ev => (
                        ev.isVisibleInSidePanel ?
                            <SidePanelEventsListItem key={ev.id} ev={ev} onClick={() => this.selectItem(ev.id)}/> :
                            null
                    )
                )}
            </div>
        );
    }
}



export default observer(SidePanelEventsList);