import React from 'react';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import uniq from 'lodash/uniq';
import capitalize from 'lodash/capitalize';

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

class EventsBarChart extends React.Component {
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

        return (
            <ResponsiveContainer>
                <BarChart width={600} height={300} data={data}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Bar isAnimationActive={false} dataKey="pv" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
export default observer(EventsBarChart);