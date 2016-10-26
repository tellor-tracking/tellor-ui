import React from 'react';
import {observer} from 'mobx-react';
import capitalize from 'lodash/capitalize';

class EventsSegmentationSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSelect = (ev) => {
        this.props.event.selectSegmentation(ev.target.value);
    };

    render() {
        const event = this.props.event;

        return (
            <span className="EventsSegmentationSelector select">
                <select value={event.activeSegmentation} onChange={this.handleSelect} name="segmentation">
                    <option value="count">Total count</option>
                    {event.segmentation.map(s => <option key={s} value={s}>{capitalize(s)}</option>)}
                </select>
            </span>
        );
    }
}

export default observer(EventsSegmentationSelector);