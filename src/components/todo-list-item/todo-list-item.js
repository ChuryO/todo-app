import React, {Component} from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {
    render() {
        const {label, onToggleDone, onToggleImportant, onDelete, done, important} = this.props;

        return (
            <span className={`todo-list-item ${done ? 'done' : ''} ${important ? 'important' : ''}`}>
            <span className={`todo-list-item-label`}
                  onClick={onToggleDone}>
                {label}</span>
              <button className="btn btn-outline-success btn-sm float-right"
                      type="button" onClick={onToggleImportant}>
                  <i className="fa fa-exclamation"/>
              </button>

              <button className="btn btn-outline-danger btn-sm float-right"
                      type="button" onClick={onDelete}>
                  <i className="fa fa-trash-o"/></button>
        </span>
        );
    }
}
