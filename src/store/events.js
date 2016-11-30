import { observable, action, reaction } from 'mobx';
import _get from 'lodash/get';

export default class Event {

    DEFAULT_SEGMENTATION = 'count';
    CHARTS = {
        LINE: 'LINE',
        BAR: 'BAR'
    };

    statsPoolingInterval = 15000;
    fetchTimeOutId = null;
    stats = null;
    dataToDisplayKey = this.DEFAULT_SEGMENTATION;


    @observable dataToDisplay = null;
    @observable totalCount = null;
    @observable chartType = this.CHARTS.LINE;

    @observable segmentation = null;
    @observable activeSegmentation = this.DEFAULT_SEGMENTATION;

    @observable id = null;
    @observable name = null;
    @observable isActive = false;
    @observable isVisibleInSidePanel = true; // for filtering

    @observable isFetching = false;

    constructor(store, application, {_id, name, segmentation}) {
        this.store = store;
        this.application = application;

        this.id = _id;
        this.name = name;
        this.segmentation = segmentation;
        reaction(() => this.isActive, isActive => isActive ? this.fetchStatsOnInterval() : null);
        reaction(() => this.application.statsQuery.startDate, () => this.fetchStatsOnInterval());
        reaction(() => this.application.statsQuery.endDate, () => this.fetchStatsOnInterval());
    }

    @action select = () => {
        this.application.selectEvent(this.id);
    };

    @action deselect = () => {
        this.application.deselectActiveEvent();
    };

    @action fetchStatsOnInterval = () => {
        clearTimeout(this.fetchTimeOutId);
        this.isFetching = true;
        this.store.transportAgent.fetchOneEventStats(this.id, this.application.statsQuery)
            .then(stats => {
                this.stats = stats;
                this.isFetching = false;
                this.setDataToDisplay();
            })
            .catch(() => this.isFetching = false);

        if (this.isActive) {
            this.fetchTimeOutId = setTimeout(this.fetchStatsOnInterval, this.statsPoolingInterval);
        }
    };

    @action selectSegmentation = (value) => {
        this.activeSegmentation = value;
        this.dataToDisplayKey = value === this.DEFAULT_SEGMENTATION ? value : `segmentation.${value}`;
        this.setDataToDisplay();
    };

    @action selectChartType = (value) => {
        this.chartType = value;
    };

    @action setDataToDisplay = () => {
        this.dataToDisplay = _get(this.stats, this.dataToDisplayKey);
        this.totalCount = this.stats.totalCount;
    };

}

