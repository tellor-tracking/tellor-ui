
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

    fetchApplication(appId) {
        return fetch(`${this.base}/api/applications/${appId}`).then(r=> r.json());
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

    fetchInitialApplicationData() {
        // TODO
        // events list, total events count, events count per selected (default) period, most popular events (top 5),
        // event count diff (by % compared to 1 week, 1 month)
    }

    fetchEvents(appId) {
        return toJsonLogError(fetch(`${this.base}/api/applications/${appId}/events`));
    }

    fetchOneEventCounts(eventId, {startDate = null, endDate = null}) {
        return toJsonLogError(fetch(`${this.base}/api/events/${eventId}/count${formatQuery({startDate, endDate})}`));
    }

    createEventsFilter(appId, filterValue) {
        return toJsonLogError(fetch(
            `${this.base}/api/applications/${appId}/eventsFilters`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({eventFilter: {filterValue}})
            }
        ));
    }

    removeEventsFilter(appId, filterId) {
        return toJsonLogError(fetch(`${this.base}/api/applications/${appId}/eventsFilters/${filterId}`, {method: 'DELETE'}));

    }
}