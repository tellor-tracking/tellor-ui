import React from 'react';
import ReactModal from 'react-modal';
import {render, unmountComponentAtNode} from 'react-dom';


class PasswordConfirmationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: true};
    }

    componentDidMount() {
        this.password.focus();
    }

    close = () => {
        this.setState({isOpen: false});
        this.props.onDeny && this.props.onDeny();
        this.props.hide();
    };

    confirm = () => {
        this.setState({isOpen: false});
        this.props.onConfirm && this.props.onConfirm(this.password.value);
        this.props.hide();
    };

    render() {
        return (
            <ReactModal isOpen={this.state.isOpen}
                        onRequestClose={this.close}
                        shouldCloseOnOverlayClick={true}
                        overlayClassName="Modal-overlay"
                        className="Modal-content Modal-passwordConfirm">

                <div className="Modal-innerContent">
                    <div className="Modal-header">
                        <i onClick={this.close} className="Modal-close fa fa-1x fa-times" aria-hidden="true"></i>
                        <h3 className="title is-3">Are you sure?</h3>
                    </div>

                    <div className="Modal-body">
                            <p>You <strong>CANNOT</strong> undo this.</p>
                            <p>Please enter you password to confirm this action.</p>

                        <input className="Modal-input input" placeholder="Application password or name (if you set no password)" ref={ref => this.password = ref} type="text"/>

                        <div className="Modal-button">
                            <button onClick={this.confirm} className="button is-danger is-fullwidth">DELETE</button>
                        </div>
                    </div>

                </div>

            </ReactModal>
        );
    }
}


export default function confirmModal({
    onConfirm,
    onDeny,
} = {}) {

    function hide() {
        unmountComponentAtNode(document.querySelector('#confirmation-modal'));
    }

    render(<PasswordConfirmationModal onConfirm={onConfirm}
                                      onDeny={onDeny}
                                      hide={hide}/>, document.querySelector('#confirmation-modal'));
}