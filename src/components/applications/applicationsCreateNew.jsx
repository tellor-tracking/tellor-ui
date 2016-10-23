import React from 'react';
import {observer} from 'mobx-react';


const NameInput = ({onChange, value}) => (
    <input onChange={onChange} value={value} className="ApplicationsCreateNew-input" type="text" placeholder="New application"/>
);

const PasswordInput = ({onChange, value}) => (
    <input onChange={onChange} value={value} className="ApplicationsCreateNew-input" type="text" placeholder="Password (optional)"/>
);

@observer
class ApplicationsCreateNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };
    }

    createApp = () => {
        this.props.store.createApplication(this.state);
        this.setState({name: '', password: ''});
    };

    changeName = (ev) => {
        this.setState({name: ev.target.value});
    };

    changePassword = (ev) => {
        this.setState({password: ev.target.value});
    };

    render() {
        return (
            <div className="ApplicationsCreateNew">
                <NameInput value={this.state.name} onChange={this.changeName}/>
                {this.state.name.length > 0 ?
                    <PasswordInput value={this.state.password} onChange={this.changePassword}/> :
                    null
                }
                {this.state.name.length > 0 ?
                    <button onClick={this.createApp} className="ApplicationsCreateNew-button button is-primary">Create</button> :
                    null
                }

            </div>
        );
    }
}


export default ApplicationsCreateNew;