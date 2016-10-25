import React from 'react';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

function EventsChart({event}) {
    const count = toJS(event.count);
    console.log(count);
    return (
        <ResponsiveContainer>
            <LineChart data={count}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
    );
}
export default observer(EventsChart);