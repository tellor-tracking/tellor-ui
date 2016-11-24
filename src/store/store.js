import { observable, action, reaction } from 'mobx';
import _get from 'lodash/get';
import moment from 'moment';
import { DATE_FORMAT } from '../constants';


class Store {

    @observable username = '';
    @observable isAuthenticated = false;

    @observable applications = [];
    @observable activeApplicationId = null;

    @observable isInitialLoadDone = true;

    constructor(transportAgent, browserHistory) {

        transportAgent.setAuthFailHandler(this.handleAuthFail);

        this.transportAgent = transportAgent;
        this.browserHistory = browserHistory;
    }

    handleAuthFail = (fetchPromise) => {
        this.isAuthenticated = false;
        this.browserHistory.push('/login');
        return Promise.reject({isAuthFailed: true, message: 'Auth failed skipping promise chain, redirecting to login'});
    };

    getApplication(id) {
        return this.applications.find(app => app.id === id);
    }

    @action fetchApplications = () => {
        this.transportAgent.fetchApplications()
            .then((result)=> {
                result.forEach(a => this.applications.push(new Application(this, a)));
                this.isInitialLoadDone = true;
            });
    };

    @action authenticate = ({username, password}) => {
        this.transportAgent.authenticate(username, password)
            .then(result => {
                if (result.isSuccessful) {
                    this.username = username;
                    this.isAuthenticated = true;
                    this.browserHistory.push('/app');
                }
            });
    };

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

    @action deleteApplication(appId, password) {
        this.transportAgent.deleteApplication(appId, password)
            .then(r => {
                const i = this.applications.findIndex(a => a.id === appId);
                if (r.isSuccessful && i !== -1) {
                    this.applications.splice(i, 1);
                    this.browserHistory.push('/app');
                }
            });
    }
}


class Application {

    FILTERS = {
        ADD_FILTER: 'ADD_FILTER',
        VALUES: { // todo these should come from server
            IP: 'ip',
            APP: 'appVersion',
        },

        OPERATORS: {
            EQ: '=',
            NEQ: '!='
        }
    };

    @observable events = [];
    @observable eventsFilters = [];
    @observable id = null;
    @observable name = null;
    @observable isActive = false;
    @observable activeEventId = null;

    @observable isFetching = false;

    @observable statsQuery = {
        startDate: moment.utc().subtract(30, 'days').format(DATE_FORMAT),
        endDate: moment.utc().format(DATE_FORMAT),
        appVersionFilter: null,
        ipFilter: null
    };


    constructor(store, applicationData) {
        this.store = store;
        this.setBasicValues(applicationData);


        reaction(() => this.isActive, (isActive) => isActive ? this.fetchEvents() : this.deselectActiveEvent());
    }

    @action setBasicValues = ({_id, name, eventsFilters}) => {
        this.id = _id;
        this.name = name;
        this.eventsFilters = eventsFilters || [];
    };

    @action select = () => {
        this.store.selectApplication(this.id);
    };

    @action deselect = () => {
        this.store.deselectActiveApplication();
    };

    @action update = () => {
        this.store.transportAgent.fetchApplication(this.id)
            .then(app => this.setBasicValues(app));

    };

    @action showSettings = () => {
        this.store.showSettingsApplicationId = this.id;
    };

    @action hideSettings = () => {
        this.store.showSettingsApplicationId = null;
    };

    @action selectFilter = (value, type = null) => {
        if (value === this.FILTERS.ADD_FILTER) {
            return this.showSettings();
        }

        if (type === this.FILTERS.VALUES.APP) {
            this.statsQuery.appVersionFilter = value;
        }

        if (type === this.FILTERS.VALUES.IP) {
            this.statsQuery.ipFilter = value;
        }

        const activeEvent = this.getActiveEvent();
        activeEvent && activeEvent.fetchStatsOnInterval();
    };

    @action createFilter = ({filter, operator, value}) => {
        this.store.transportAgent.createEventsFilter(this.id, `${filter}${operator}${value}`)
            .then(this.update);
    };

    @action removeFilter = (filterId, password) => {
        this.store.transportAgent.removeEventsFilter(this.id, filterId, password)
            .then(this.update);
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
            if (!this.events.find(existingEv => existingEv.id === ev._id)) {
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

    constructor(store, application, {_id, name, segmentation}) {
        this.store = store;
        this.application = application;

        this.id = _id;
        this.name = name;
        this.segmentation = segmentation;
        reaction(() => this.isActive, (isActive) => isActive ? this.fetchStatsOnInterval() : null);
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

export default Store;