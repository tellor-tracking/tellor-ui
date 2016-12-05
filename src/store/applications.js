import { observable, action, reaction } from 'mobx';
import moment from 'moment';
import { DATE_FORMAT } from '../constants';
import Event from './events';


export default class Application {

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
    @observable isInitialEventsLoadDone = false;

    @observable isFetching = false;

    @observable statsQuery = {
        startDate: moment.utc().subtract(30, 'days').format(DATE_FORMAT),
        endDate: moment.utc().format(DATE_FORMAT),
        appVersionFilter: null,
        ipFilter: null,
        step: 'day'
    };


    constructor(store, applicationData) {
        this.store = store;
        this.setBasicValues(applicationData);


        reaction(() => this.isActive, isActive => isActive ? this.fetchEvents() : this.deselectActiveEvent());
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

    @action setStatsQueryDate = ({startDate, endDate}) => {
        if (startDate) {
            this.statsQuery.startDate = startDate.format(DATE_FORMAT);
        }

        if (endDate) {
            this.statsQuery.endDate = endDate.format(DATE_FORMAT);
        }

        this.statsQuery.step =  startDate.isSame(endDate, 'day') ? 'hour' : endDate.diff(startDate, 'months') >= 6 ? 'month' : 'day';
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
            .catch(() => this.isFetching = false);
    }

    @action onEventsLoad(events) {
        this.isFetching = false;

        for (let event of events) {
            if (!this.events.find(existingEv => existingEv.id === event._id)) {
                this.events.push(new Event(this.store, this, event));
            }
        }
        if (!this.isInitialEventsLoadDone) this.isInitialEventsLoadDone = true;
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

    @action getActiveEvent = () => this.events.find(ev => ev.id === this.activeEventId);
}
