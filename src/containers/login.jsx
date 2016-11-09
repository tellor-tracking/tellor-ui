import React from 'react';
import {observer} from 'mobx-react';

@observer
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            account: '',
            password: ''
        };
    }

    handleUsernameChange = (ev) => {
        this.setState({username: ev.target.value});
    };

    handlePasswordChange = (ev) => {
        this.setState({password: ev.target.value});
    };

    handleSubmit = () => {
        this.props.store.authenticate(this.state);
    };

    render() {
        return (
            <div className="Login">
                <form onSubmit={(e) => {e.preventDefault(); this.handleSubmit();}} className="Login-form">
                    <label className="label">Username</label>
                    <div className="control">
                        <input onChange={this.handleUsernameChange} id="username" type="text" className="input"/>
                    </div>

                    <label className="label">Password</label>
                    <div className="control">
                        <input onChange={this.handlePasswordChange} id="password" type="password" className="input"/>
                    </div>
                    <button className="button is-primary is-fullwidth">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;