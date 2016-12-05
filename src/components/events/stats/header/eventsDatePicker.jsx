import React from 'react';
import {observer} from 'mobx-react';
import moment from 'moment';
import 'moment/locale/en-gb';

import {DATE_FORMAT} from '../../../../constants';
import enUS from 'antd/lib/date-picker/locale/en_US';

import DatePicker from 'antd/lib/date-picker/index';
const RangePicker = DatePicker.RangePicker;


@observer
class EventsDatePicker extends React.Component {

    onDatesChange = ([startDate, endDate]) => {
        this.props.app.setStatsQueryDate({startDate, endDate});
    };

    render() {
        moment.locale('en-gb'); // solves a weird bug where locale is lost and it displays chinese letters

        return (
            <div className="EventsHeader-dateSection">
                <RangePicker
                    value={[moment(this.props.app.statsQuery.startDate), moment(this.props.app.statsQuery.endDate)]}
                    locale={enUS}
                    allowClear={false}
                    format={DATE_FORMAT}
                    ranges={{
                        'Today': [moment(), moment()],
                        'This week': [moment().startOf('week'), moment().endOf('week')],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        '7 Days': [moment().subtract(7, 'days'), moment()],
                        '30 Days': [moment().subtract(30, 'days'), moment()],
                        '60 Days': [moment().subtract(60, 'days'), moment()],
                        '6 Months': [moment().subtract(6, 'months'), moment()],
                    }}
                    onChange={this.onDatesChange}
                    getCalendarContainer={() => document.querySelector('#date-picker')}
                />
            </div>
        );
    }
}

export default EventsDatePicker;