function toJson(fetchPromise) {
    return fetchPromise.then(r => r.json());
}

function logError(fetchPromise) {
    return fetchPromise.catch(e => {
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
        this._authToken = sessionStorage.getItem('_authToken'); // TODO how to tell store that its authenticated on load, what to do when invalid token?
        this.authFailHandler = () => {
            throw Error('Missing auth fail handler');
        };
    }

    setAuthFailHandler(handler) {
        this.authFailHandler = handler;
    }

    handleAuthFail(fetchPromise) {
        return fetchPromise.then(r => {
            if (r.status === 401) {
                return this.authFailHandler(r);
            }

            return r;
        });
    }


    fetch(method, {uri, body, resultToJson = true}) {

        const conf = {
            credentials: 'include',
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this._authToken
            }
        };

        if (body) {
            conf.body = JSON.stringify(body);
        }


        const f = this.handleAuthFail(fetch(`${this.base}${uri}`, conf));
        const l = logError(resultToJson ? toJson(f) : f);

        return {
            then(fn) {
                return l.then(fn).catch(e => ({authFailed: true, e})); // we override then to attach to handle auth fail
            }
        };
    }

    authenticate(account, password) {
        return this.fetch('POST', {uri: '/authenticate', body: {account, password}, resultToJson: false})
            .then(response => {
                this._setAuthToken(response.headers.get('Authorization'));
                return response.json();
            });
    }

    fetchApplication(appId) {
        return this.fetch('GET', {uri: `/api/applications/${appId}`});
    }

    fetchApplications() {
        return this.fetch('GET', {uri: `/api/applications`});

    }

    createApplication(appData) {
        return this.fetch('POST', {uri: `/api/applications`, body: appData});
    }

    deleteApplication(appId, password) {
        return this.fetch('DELETE', {uri: `/api/applications/${appId}/delete`, body: {password}});
    }

    fetchInitialApplicationData() {
        // TODO
        // events list, total events count, events count per selected (default) period, most popular events (top 5),
        // event count diff (by % compared to 1 week, 1 month)
    }

    fetchEvents(appId) {
        return this.fetch('GET', {uri: `/api/applications/${appId}/events`});
    }

    fetchOneEventStats(eventId, {startDate = null, endDate = null, ipFilter = null, appVersionFilter = null, step = 'day'}) {
        let filters = '';
        if (appVersionFilter || ipFilter) {
            filters = `&filters=${ipFilter ? appVersionFilter ? ipFilter + ',' + appVersionFilter : ipFilter : appVersionFilter}`;
        }
        return this.fetch('GET', {uri: `/api/events/${eventId}/stats${formatQuery({startDate, endDate, step})}${filters}`});

    }

    createEventsFilter(appId, filterValue) {
        return this.fetch('POST', {
            uri: `/api/applications/${appId}/eventsFilters`,
            body: {eventFilter: {filterValue}}
        });
    }

    removeEventsFilter(appId, filterId, password = '') {
        return this.fetch('DELETE', {uri: `/api/applications/${appId}/eventsFilters/${filterId}`, body: {password}});

    }

    authCheck() {
        return this.fetch('GET', {uri: '/authcheck', resultToJson: false});
    }

    invalidateAuthToken() {
        this._setAuthToken(null);
    }

    _setAuthToken(token) {
        this._authToken = token;
        sessionStorage.setItem('_authToken', token);
    }
}