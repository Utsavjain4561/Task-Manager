import React, { Component } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }
  handleTodos = (newTodo) => {
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
    }));
  };
  componentDidUpdate() {
    console.log("Updated TODO list is", this.state.todos);
  }
  render() {
    return (
      <div className="container-fluid fill">
        <div className="row">
          <div className="sidebar-menu col-2 col-md-2">
            <Sidebar addTodo={this.handleTodos} />
          </div>
          <div className="dashboard col-2 col-md-10">
            <Dashboard todos={this.state.todos} />
          </div>
        </div>
      </div>
    );
  }
}
