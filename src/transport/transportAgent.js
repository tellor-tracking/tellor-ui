function toJsonLogError(fetchPromise) {
    return fetchPromise.then(r => r.json()).catch(e => {
        console.log('Failed to fetch', e);
        return Promise.reject(e);
    });
}

export default class TransportAgent {
    constructor(base = '') {
        this.base = base;
    }
    fetchApplications() {
        return fetch(`${this.base}/api/applications`).then(r=> r.json());
    }

    createApplication(appData) {

        return toJsonLogError(fetch(`${this.base}/api/applications`,
            {
                method: 'POST',
                body: JSON.stringify(appData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        ));
    }

    fetchEvents(appId) {
        return toJsonLogError(fetch(`${this.base}/api/${appId}/events`));
    }

    fetchEventsCounts(appId) {
        return toJsonLogError(fetch(`${this.base}/api/${appId}/events/count`));
    }

    fetchOneEventCounts(eventId) {
        return toJsonLogError(fetch(`${this.base}/api/events/${eventId}/count`));
    }
}