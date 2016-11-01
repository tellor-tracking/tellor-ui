import { observable, computed, action, reaction, autorun, asStructure, asReference, toJS } from 'mobx';
import _get from 'lodash/get';
import moment from 'moment';
import { DATE_FORMAT } from '../constants';


class Store {

    @observable applications = [];
    @observable activeApplicationId = null;
    @observable showSettingsApplicationId  = null;

    @observable isInitialLoadDone = true;

    constructor(transportAgent) {
        this.transportAgent = transportAgent;
        transportAgent.fetchApplications()
            .then((result)=> {
                this.onApplicationsLoad(result);
                this.isInitialLoadDone = true;
            });
    }

    onApplicationsLoad(result) {
        result.forEach(a => this.applications.push(new Application(this, a)));
    }

    getApplication(id) {
        return this.applications.find(app => app.id === id);
    }

    @action getActiveApplication() {
        return this.getApplication(this.activeApplicationId);
    }

    @action selectApplication(id) { // TODO maybe do all this selecting by using observables?
        if (this.activeApplicationId !== null && this.activeApplicationId !== id) {
            this.deselectActiveApplication();
        }

        const app = this.applications.find((a) => a.id === id);
        if (app) {
            this.activeApplicationId = id;
            app.isActive = true;
        }

        return app;
    }

    @action deselectActiveApplication = () => {
        const activeApp = this.getActiveApplication();
        if (activeApp) {
            activeApp.isActive = false;
        }

        this.activeApplicationId = null;
    };


    @action createApplication(appData) {
        this.transportAgent.createApplication(appData)
            .then(r => this.applications.push(new Application(this, Object.assign({}, appData, r))));
    }
}


class Application {
    @observable events = [];
    @observable id = null;
    @observable name = null;
    @observable isActive = false;
    @observable activeEventId = null;

    @observable isFetching = false;

    @observable statsQuery = {
        startDate: moment.utc().subtract(30, 'days').format(DATE_FORMAT),
        endDate: moment.utc().format(DATE_FORMAT)
    };


    constructor(store, {id, name}) {
        this.store = store;

        this.id = id;
        this.name = name;

        reaction(() => this.isActive, (isActive) => isActive ? this.fetchEvents() : this.deselectActiveEvent());
    }

    @action select = () => {
        this.store.selectApplication(this.id);
    };

    @action deselect = () => {
        this.store.deselectActiveApplication();
    };

    @action showSettings = () => {
        this.store.showSettingsApplicationId = this.id;
    };

    @action hideSettings = () => {
        this.store.showSettingsApplicationId = null;
    };

    @action fetchEvents() {
        this.isFetching = true;
        this.store.transportAgent.fetchEvents(this.id)
            .then((result) => this.onEventsLoad(result))
            .catch((error) => {
                console.error('Failed to fetch events', error);
                this.isFetching = false;
            });
    }

    @action onEventsLoad(events) {
        this.isFetching = false;
        events.forEach(ev=> {
            if (!this.events.find(existingEv => existingEv.id === ev.id)) {
                this.events.push(new Event(this.store, this, ev));
            }
        });
    }

    @action filterEvents(filterValue) {
        for (let event of this.events) {
            event.isVisibleInSidePanel = event.name.toLowerCase().indexOf(filterValue) > -1;
        }
    }

    @action displayAllEvents() {
        for (let event of this.events) {
            event.isVisibleInSidePanel = true;
        }
    }

    @action selectEvent = (id) => {
        if (this.activeEventId !== null && this.activeEventId !== id) {
            this.deselectActiveEvent();
        }

        const event = this.events.find((e) => e.id === id);
        if (event) {
            this.activeEventId = id;
            event.isActive = true;
        }

        return event;
    };

    @action deselectActiveEvent = () => {
        const activeEvent = this.getActiveEvent();

        if (activeEvent) {
            activeEvent.isActive = false;
        }
        this.activeEventId = null;
    };

    @action getActiveEvent = () => {
        return this.events.find(ev => ev.id === this.activeEventId);
    }
}

class Event {
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

    constructor(store, application, {id, name, segmentation}) {
        this.store = store;
        this.application = application;

        this.id = id;
        this.name = name;
        this.segmentation = segmentation;
        reaction(() => this.isActive, (isActive) => isActive ? this.fetchBasicCountsOnInterval() : null);
        reaction(() => this.application.statsQuery.startDate, () => this.fetchBasicCountsOnInterval());
        reaction(() => this.application.statsQuery.endDate, () => this.fetchBasicCountsOnInterval());
    }

    @action select = () => {
        this.application.selectEvent(this.id);
    };

    @action deselect = () => {
        this.application.deselectActiveEvent();
    };

    @action fetchBasicCountsOnInterval = () => {
        clearTimeout(this.fetchTimeOutId);
        this.isFetching = true;
        this.store.transportAgent.fetchOneEventCounts(this.id, this.application.statsQuery)
            .then(stats => {
                this.stats = stats;
                this.isFetching = false;
                this.setDataToDisplay();
            })
            .catch(() => this.isFetching = false);

        if (this.isActive) {
            this.fetchTimeOutId = setTimeout(this.fetchBasicCountsOnInterval, this.statsPoolingInterval);
        }
    };

    @action selectSegmentation = (value) => {
        this.activeSegmentation = value;
        this.dataToDisplayKey = `segmentation.${value}`;
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

export default Store;