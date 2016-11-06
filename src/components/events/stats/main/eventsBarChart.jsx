import React from 'react';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import capitalize from 'lodash/capitalize';

function addToCount(key, value, obj) {
    if (obj[key] !== undefined) {
        obj[key] += value;
    } else {
        obj[key] = value;
    }
}

function splitIntoSeparateObject(obj) {
    return Object.keys(obj).reduce((finalList, key) => {
        finalList.push({name: key, value: obj[key]});
        return finalList;
    }, []);
}

function calcAccumulatedCounts(data) {
    return splitIntoSeparateObject(data.reduce((result, oneCount) => {
            for (let key in oneCount) {
                if (key !== 'date') {
                    addToCount(capitalize(key), oneCount[key], result);
                }
            }

            return result;
        }, {})
    );
}

function EventsBarChart () {
        const data = calcAccumulatedCounts(toJS(this.props.event.dataToDisplay));
        return (
            <ResponsiveContainer>
                <BarChart width={600} height={300} data={data}
                          margin={{top: 5, right: 50, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Bar dataKey="value" fill="#8884d8" isAnimationActive={false}/>
                </BarChart>
            </ResponsiveContainer>
        );
}


export default observer(EventsBarChart);