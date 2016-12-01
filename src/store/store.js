import { observable, action } from 'mobx';
import Application from './applications';


export default class Store {

    @observable username = '';
    @observable isAuthenticated = false;

    @observable applications = [];
    @observable activeApplicationId = null;

    @observable isInitialApplicationsLoadDone = false;

    constructor(transportAgent, browserHistory) {

        transportAgent.setAuthFailHandler(this.handleAuthFail);

        this.transportAgent = transportAgent;
        this.browserHistory = browserHistory;

        transportAgent.authCheck().then(() => this.isAuthenticated = true);
    }

    @action handleAuthFail = (fetchPromise) => {
        this.logout();
        return Promise.reject({isAuthFailed: true, message: 'Auth failed skipping promise chain, redirecting to login'});
    };

    @action getApplication = (id) => {
        return this.applications.find(app => app.id === id);
    };

    @action fetchApplications = () => {
        this.transportAgent.fetchApplications()
            .then(this.onApplicationsLoad);
    };

    @action onApplicationsLoad = (applications) => {
        for (let app of applications) {
            if (!this.applications.find(existingApp => existingApp.id === app._id)) {
                this.applications.push(new Application(this, app));
            }
        }

        if (!this.isInitialApplicationsLoadDone) this.isInitialApplicationsLoadDone = true;
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

    @action logout = () => {
        this.isAuthenticated = false;
        this.browserHistory.push('/login');
        this.transportAgent.invalidateAuthToken();
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
