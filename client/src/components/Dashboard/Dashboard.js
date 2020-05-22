import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import "./Dashboard.css";
import TodoListItem from "../TodoListItem/TodoListItem";
export default class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="content">
          <ul className="todo-list">
            {this.props.todos.map((todo) => {
              return (
                <li>
                  <TodoListItem todo={todo} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
