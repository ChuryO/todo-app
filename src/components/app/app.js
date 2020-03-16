import React, {Component} from 'react';
import AppHeader from '../app-header';

import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItemForm from "../add-item-form";

import './app.css';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.id = 0;
        this.createTodoItem = (label) => {
            return {
                label: `${label} ${this.id}`,
                done: false,
                important: false,
                id: this.id++
            }
        };

        this.toggleProperty = (arr, id, propName) => {
            const index = arr.findIndex(el => el.id === id);
            const oldItem = arr[index];
            const newItem = {...oldItem, [propName]: !oldItem[propName]};
            return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
        };

        this.onToggleDone = (id) => {
            this.setState(({todoData}) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'done')
                }
            });
        };

        this.onToggleImportant = (id) => {
            this.setState(({todoData}) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'important')
                }
            });
        };
        // Remove
        this.deleteItem = (id) => {
            this.setState(({todoData}) => {
                const index = todoData.findIndex(el => el.id === id);
                const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];
                todoData.splice(index, 1);
                return {
                    todoData: newArray
                }
            });
        };
        // Add
        this.addItem = (label) => {
            const newItem = this.createTodoItem(label);
            this.setState(({todoData}) => {
                const newArray = [...todoData, newItem];
                return {
                    todoData: newArray,
                }
            });
        };
        // Search for text match
        this.searchItem = (items, term) => {
            if (term.length === 0) {
                return items;
            }
            return items.filter(item => {
                return item.label.toLowerCase().indexOf(term.toLowerCase()) >= 0;
            });
        };

        this.onSearchChange = (term) => {
            this.setState({term});
        };

        // Filter category
        this.filterItems = (items, filter) => {
            switch (filter) {
                case 'all':
                    return items;
                case 'active':
                    return items.filter(item => !item.done);
                case 'done':
                    return items.filter(item => item.done);
                default:
                    return items;
            }
        };

        this.onFilterChange = (filter) => {
            this.setState({filter});
        };

        this.state = {
            todoData: [
                this.createTodoItem('Drink Coffee'),
                this.createTodoItem('Make Awesome App'),
                this.createTodoItem('Have a lunch')
            ],
            term: '',
            filter: 'all'
        };

    };

    render() {
        const {todoData, term, filter} = this.state;

        const visibleItems = this.filterItems(
            this.searchItem(todoData, term), filter
        );

        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
                </div>

                <TodoList
                    todoList={visibleItems}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}
                    onDelete={(id) => this.deleteItem(id)}/>
                <AddItemForm onItemAdded={this.addItem}/>
            </div>
        );
    };
};
