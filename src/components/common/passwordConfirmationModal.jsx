import React from 'react';
import ReactModal from 'react-modal';
import {render, unmountComponentAtNode} from 'react-dom';


class PasswordConfirmationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: true};
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
                        className="Modal-content">
                <div className="Modal-header">
                    <h3 className="title is-3">Are you sure?</h3>
                </div>
                <div className="Modal-body">
                    You CANNOT undo this. Please enter you password to confirm this action.
                    <input className="input" placeholder="Application password or name (if you set no password)" ref={ref => this.password = ref} type="text"/>
                </div>
                <div>
                    <button onClick={this.confirm} className="button is-danger is-fullwidth">DELETE</button>
                </div>
            </ReactModal>
        );
    }
}


export default function confirmModal({
    onConfirm: onConfirm,
    onDeny: onDeny,
    message: message = 'Default message',
    title: title
} = {}) {

    function hide() {
        unmountComponentAtNode(document.querySelector('#confirmation-modal'));
    }

    render(<PasswordConfirmationModal onConfirm={onConfirm}
                                      onDeny={onDeny}
                                      message={message}
                                      title={title}
                                      hide={hide}/>, document.querySelector('#confirmation-modal'));
}