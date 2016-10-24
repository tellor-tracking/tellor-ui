import { observable, computed, action, reaction } from 'mobx';


class Store {

    @observable applications = [];
    @observable activeApplicationId = null;
    @observable showInfoApplicationId  = null;

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
            .then(r => this.applications.push(new Application(this, Object.assign({}, appData, r))))
    }
}


class Application {
    @observable events = [];
    @observable id = null;
    @observable name = null;
    @observable isActive = false;
    @observable activeEventId = null;

    @observable isFetching = false;

    constructor(store, {id, name}) {
        this.store = store;

        this.id = id;
        this.name = name;

        reaction(() => this.isActive, (isActive) => isActive ? this.fetchEvents() : this.deselectActiveEvent());
    }

    @action select() {
        this.store.selectApplication(this.id);
    }

    @action deselect() {
        this.store.deselectActiveApplication();
    }

    @action showInfo() {
        this.store.showInfopplicationId = this.id;
    }

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
    statsPoolingInterval = 15000;
    @observable segmentation = null;
    @observable id = null;
    @observable name = null;
    @observable isActive = false;
    @observable isVisibleInSidePanel = true; // for filtering

    @observable count = null;
    @observable segmentationCounts = null;

    @observable isFetching = false;

    constructor(store, application, {id, name, segmentation}) {
        this.store = store;
        this.application = application;

        this.id = id;
        this.name = name;
        this.segmentation = segmentation;
        reaction(() => this.isActive, (isActive) => isActive ? this.fetchBasicCountsOnInterval() : null);

    }

    @action select = () => {
        this.application.selectEvent(this.id);
    };

    @action deselect = () => {
        this.application.deselectActiveEvent();
    };

    @action fetchBasicCountsOnInterval = () => {
        this.isFetching = true;
        this.store.transportAgent.fetchOneEventCounts(this.id)
            .then(stats => {
                this.count = stats.count;
                this.segmentationCounts = stats.segmentation;

                this.isFetching = false;
            })
            .catch(() => this.isFetching = false);

        if (this.isActive) {
            setTimeout(this.fetchBasicCountsOnInterval, this.statsPoolingInterval);
        }
    };
}

export default Store;