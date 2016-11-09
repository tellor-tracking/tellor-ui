import React from 'react';
import {observer} from 'mobx-react';

import Header from './header.jsx';

@observer
class AppWrap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="MainSection">
                <Header {...this.props}/>
                {this.props.children}
            </div>
        );
    }
}

export default AppWrap;