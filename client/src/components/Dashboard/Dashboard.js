import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import "./Dashboard.css";
import TodoListItem from "../TodoListItem/TodoListItem";
export default class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Navbar sort={this.props.sort} />
        <div className="content">
          <ul className="todo-list">
            {this.props.todos.map((todo) => {
              return (
                <li>
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
