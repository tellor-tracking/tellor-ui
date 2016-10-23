
export default class TransportAgent {
    constructor(base = '') {
        this.base = base;
    }
    fetchApplications() {
        return fetch(`${this.base}/api/applications`).then(r=> r.json());
    }

    createApplication(appData) {

        return fetch(`${this.base}/api/applications`,
            {
                method: 'POST',
                body: JSON.stringify(appData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        ).then(r=> r.json());
    }

    fetchEvents(appId) {
        return fetch(`${this.base}/api/${appId}/events`).then(r=> r.json());
    }

    fetchEventsCounts(appId) {
        return fetch(`${this.base}/api/${appId}/events/count`).then(r=> r.json());
    }
}