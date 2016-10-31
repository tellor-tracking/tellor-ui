import React from 'react';
import {observer} from 'mobx-react';


function EventsChartSwitcher({event}) {
    return (
        <div className="EventsChartSwitcher">
            <span onClick={() => event.selectChartType(event.CHARTS.LINE)}
                  className={`EventsChartSwitcher-item ${event.chartType === event.CHARTS.LINE ? 'is-active' : ''}`}>Over time</span>
            <span onClick={() => event.selectChartType(event.CHARTS.BAR)}
                  className={`EventsChartSwitcher-item ${event.chartType === event.CHARTS.BAR ? 'is-active' : ''}`}>Accumulated</span>
        </div>
    );
}

export default observer(EventsChartSwitcher);