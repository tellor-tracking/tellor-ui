import React from 'react';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import uniq from 'lodash/uniq';
import capitalize from 'lodash/capitalize';

const colors = [
    '#8884d8',
    '#FFE48B',
    '#EF83A9',
    '#BCF284',
];

class EventsLineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    getLines = (data) => {
        if (!data) {
            return [];
        }

        const keys = uniq(data.reduce((names, obj) => {
            return names.concat(Object.keys(obj));
        }, [])).filter(v => v !== 'date');

        return keys.map((k, i) => <Line key={k}
                                   type="monotone"
                                   name={capitalize(k)}
                                   dataKey={k}
                                   stroke={colors[i % 4]}
                                   activeDot={{r: 8}}
                                   connectNulls={true}
                                   strokeWidth={2}
                                   isAnimationActive={false}/>);
    };

    render() {

        const dataToDisplay = toJS(this.props.event.dataToDisplay);
        return (
            <ResponsiveContainer>
                <LineChart data={dataToDisplay}
                           margin={{top: 5, right: 50, left: 20, bottom: 5}}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    {this.getLines(dataToDisplay)}
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
export default observer(EventsLineChart);