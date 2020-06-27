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
          {this.props.todos.length===0?
          <div style={{ background:"white"}}className="jumbotron">
              <h3>No new tasks found !!</h3>
              <p>Add new tasks by clicking on <img  src="https://i.imgur.com/6dgXqic.png"/> button</p>
            </div>:
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
        </ul>}
          
        </div>
      </div>
    );
  }
}
