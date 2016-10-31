import React from 'react';
import {observer} from 'mobx-react';

@observer
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Header nav">
                <div className="Header-leftSide nav-left">
                    <a className="nav-item is-brand" href="#">
                        <div className="Header-logoPlaceholder"></div>
                    </a>
                </div>
            </div>
        );
    }
}

export default Header;