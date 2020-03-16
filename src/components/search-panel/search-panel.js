import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
    constructor(params) {
        super(params);
        this.onSearchChange = (e) => {
            const term = e.target.value;
            this.setState({term});
            this.props.onSearchChange(term);
        };

        this.state = {
            term: ''
        }
    }

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   value={this.state.term}
                   onChange={this.onSearchChange}
            />
        );
    }
}
