import React from 'react';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import uniq from 'lodash/uniq';
import capitalize from 'lodash/capitalize';



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

        // TODO add colors,
        return keys.map(k => <Line key={k}
                                   type="monotone"
                                   name={capitalize(k)}
                                   dataKey={k}
                                   stroke="#8884d8"
                                   activeDot={{r: 8}}
                                   isAnimationActive={false}/>);
    };

    render() {

        const dataToDisplay = toJS(this.props.event.dataToDisplay);
        return (
            <ResponsiveContainer>
                <LineChart data={dataToDisplay}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
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