import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import "./Dashboard.css";

import TodoListItem from "../TodoListItem/TodoListItem";
export default class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Navbar
          sort={this.props.sort}
          todos={this.props.todos}
          showSearchTodo={this.props.showSearchTodo}
          showTodo={this.props.showTodo}
        />
        <div className="content" id="data">
          <ul className="todo-list">
            {this.props.todos.map((todo) => {
              return (
                <li key={todo._id}>
                  <TodoListItem
                    todo={todo}
                    deleteTodo={this.props.deleteTodo}
                    checkTodo={this.props.checkTodo}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
