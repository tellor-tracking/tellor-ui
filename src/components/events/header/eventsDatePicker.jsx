import React from 'react';
import moment from 'moment';

import { DATE_FORMAT } from '../../../constants';
import {DateRangePicker} from 'react-dates';

class EventsDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null,
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    onDatesChange({ startDate, endDate }) {
        if (startDate) {
            this.props.app.statsQuery.startDate = startDate.format(DATE_FORMAT);
        }
        if (endDate) {
            this.props.app.statsQuery.endDate = endDate.format(DATE_FORMAT);
        }
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    render() {
        const {focusedInput} = this.state;
        return (
            <div>
                <DateRangePicker
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={moment(this.props.app.statsQuery.startDate)}
                    endDate={moment(this.props.app.statsQuery.endDate)}
                    isOutsideRange={() => false}
                />
            </div>
        );
    }
}

export default EventsDatePicker;