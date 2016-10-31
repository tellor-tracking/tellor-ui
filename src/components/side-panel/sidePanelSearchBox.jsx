import React from 'react';
import {observer} from 'mobx-react';


class SidePanelSearchBox extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            value: ''
        };
    }

    onChange = (event) => {
        const val = event.target.value.toLowerCase();

        if (val === '') {
            this.props.store.getActiveApplication().displayAllEvents();
        } else {
            this.props.store.getActiveApplication().filterEvents(val);
        }
    };


    render() {
        return (
            <div className="SidePanel-searchBox">
                <input onChange={this.onChange} className="" type="text" placeholder="Event name"/>
            </div>
        );
    }
}

export default observer(SidePanelSearchBox);