import React from 'react';
import {observer} from 'mobx-react';

class AddFilter extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            filter: '---',
            operator: '---',
            value: ''
        };
    }

    onChange = (field, value) => {
        this.setState({[field]: value});
    };

    createFilter = () => {
        const {filter, operator, value} = this.state;
        if (filter === '---' || operator === '---' || value === '') return;

        this.props.app.createFilter(this.state);
        this.setState({filter: '', operator: '', value: ''});
    };

    render () {
        const app = this.props.app;

        return (
            <div className="ApplicationsFilters-addFilter">
                <div className="ApplicationsFilters-addFilterInputs">
                <span className="ApplicationsFilters-key select">
                    <select onChange={ev => this.onChange('filter', ev.target.value)} value={this.state.filter} name="f" id="f">
                        <option value="---">---</option>
                        <option value={app.FILTERS.VALUES.APP}>App version</option>
                        <option value={app.FILTERS.VALUES.IP}>Ip address</option>
                    </select>
                </span>

                    <span className="ApplicationsFilters-compare select">
                    <select onChange={ev => this.onChange('operator', ev.target.value)} value={this.state.operator} name="f" id="f">
                        <option value="---">---</option>
                        <option value={app.FILTERS.OPERATORS.EQ}>=</option>
                        <option value={app.FILTERS.OPERATORS.NEQ}>!=</option>
                    </select>
                </span>

                    <span className="ApplicationsFilters-value">
                    <input onChange={ev => this.onChange('value', ev.target.value)} value={this.state.value} className="input is-inline" type="text" placeholder="value"/>
                </span>
                </div>


                <button onClick={this.createFilter} className="button">Create</button>
            </div>
        );
    }

}

export default observer(AddFilter);