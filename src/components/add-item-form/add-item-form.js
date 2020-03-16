import React, {Component} from "react";

import './add-item-form.css';

export default class AddItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: ''
        };
        this.onLabelChange = (e) => {
            this.setState({
                label: e.target.value
            });
        };
        this.onSubmit = (e) => {
            e.preventDefault();
            this.props.onItemAdded(this.state.label);
            this.setState({
                label: ''
            });
        };
    };

    render() {
        return (
            <form className='add-item-form d-flex my-3' onSubmit={this.onSubmit}>
                <input type="text"
                       className="form-control"
                       onChange={this.onLabelChange}
                       value={this.state.label}
                       placeholder="What needs to be done?"/>
                <button className="btn btn-outline-secondary ml-1" type='submit'>Add</button>
            </form>
        );
    };
};
