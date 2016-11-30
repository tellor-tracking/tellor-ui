import React from 'react';
import {observer} from 'mobx-react';


function Header({store}) {
    return (
        <div className="Header nav">
            <div className="Header-leftSide nav-left">
                <a className="nav-item is-brand" href="#">
                    <div className="Header-logoPlaceholder">T</div>
                    <div className="Header-subtitle">Beta</div>
                </a>
            </div>
            <div className="Header-rightSide nav-right">
                <a className="Header-link nav-item is-inactive">
                    Documentation
                </a>
                <a href="https://github.com/tellor-tracking" className="Header-link nav-item">
                        <span className="icon">
                            <i className="fa fa-github"></i>
                        </span>
                </a>

                {store.isAuthenticated ?  <div className="Header-separator"></div> : null}
                {store.isAuthenticated ? <a onClick={store.logout} className="Header-link nav-item is-inactive">Logout</a> : null}
            </div>
        </div>
    );
}

export default observer(Header);