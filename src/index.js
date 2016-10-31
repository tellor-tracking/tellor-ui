import 'whatwg-fetch';
import React from 'react';
import {render} from 'react-dom';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import './styles/mains.scss';

import Store from './store/store';
import TransportAgent from './transport/transportAgent';

import Header from './containers/header.jsx';
import SidePanel from './containers/sidePanel.jsx';
import Stage from './containers/stage.jsx';


@observer
class AppWrap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="MainSection">
                <Header {...this.props}/>
                <div className="Main">
                    {store.activeApplicationId === null ? null : <SidePanel {...this.props}/>}
                    <Stage {...this.props}/>
                </div>
            </div>
        );
    }
}

const store = new Store(new TransportAgent('http://localhost:4000'));

render(<AppWrap store={store}/>, document.getElementById('app'));

