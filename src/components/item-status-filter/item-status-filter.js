import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'all', label: 'All'},
            {name: 'active', label: 'Active'},
            {name: 'done', label: 'Done'}
        ];
    }

    render() {

        const {filter, onFilterChange} = this.props;

        const buttons = this.buttons.map(({name, label}) => {
            const isActive = filter === name;
            return (
                <button type="button"
                        className={`btn ${isActive ? 'btn-info' : 'btn-outline-secondary'}`}
                        key={name}
                        onClick={() => onFilterChange(name)}>
                    {label}
                </button>
            );
        });
        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    };
};
