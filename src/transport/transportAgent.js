
function toJsonLogError(fetchPromise) {
    return fetchPromise.then(r => r.json()).catch(e => {
        console.error('Failed to fetch', e);
        return Promise.reject(e);
    });
}

function formatQuery(queryObject) {
    const getDivider = (q) => q.indexOf('?') > -1 ? '&' : '?';

    return Object.keys(queryObject).reduce((query, key) => {
        if (queryObject[key] !== null) {
            query += `${getDivider(query) + key}=${queryObject[key]}`;
        }

        return query;
    }, '');
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

    fetchEventsCounts(appId, {startDate = null, endDate = null}) {
        return toJsonLogError(fetch(`${this.base}/api/${appId}/events/count${formatQuery({startDate, endDate})}`));
    }

    fetchOneEventCounts(eventId, {startDate = null, endDate = null}) {
        return toJsonLogError(fetch(`${this.base}/api/events/${eventId}/count${formatQuery({startDate, endDate})}`));
    }
}