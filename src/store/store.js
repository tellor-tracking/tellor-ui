import { observable, computed, action, reaction } from 'mobx';

function addToListIfUnique(targetList, items) {
    items.forEach(i => {
        if (!targetList.find(t => t.id === i.id)) {

        }
    })
}

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

    @action deselectApplication = () => {
        this.activeApplicationId = null;
    };



    @action selectApplication(id) {
        const app = this.applications.find((a) => a.id === id);
        if (app) {
            this.activeApplicationId = id;
            app.select();
        }
        return app;
    }

    @action createApplication(appData) {
        this.transportAgent.createApplication(appData)
            .then(r => this.applications.push(new Application(this, Object.assign({}, appData, r))))
            .catch(error => console.error(`Failed to create application`, error));
    }
}


class Application {
    @observable events = [];
    @observable id = null;
    @observable name = null;
    @observable isActive = false;

    @observable isFetching = false;

    constructor(store, {id, name}) {
        this.id = id;
        this.name = name;
        this.store = store;

        //reaction(() => this.isActive, (isActive) => isActive ? this.fetchEvents() : null);
    }

    @action select() {
        this.fetchEvents();
        this.isActive = true;
        this.store.activeApplicationId = this.id;
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
                this.events.push(new Event(ev));
            }
        });
    }
}

class Event {

}

export default Store;