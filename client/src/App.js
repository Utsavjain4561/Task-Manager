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

      workTodos: [],
      personalTodos: [],
      shoppingTodos: [],
      othersTodos: [],
    };
  }
  deleteTodo = (todo) => {
    // let oldTodos = [...this.state.todos];
    // console.log(oldTodos);
    // oldTodos =
    this.setState({
      todos: this.state.todos.filter((item) => item._id !== todo._id),
      workTodos: this.state.workTodos.filter((item) => item._id !== todo._id),
      personalTodos: this.state.personalTodos.filter(
        (item) => item._id !== todo._id
      ),
      shoppingTodos: this.state.shoppingTodos.filter(
        (item) => item._id !== todo._id
      ),
      othersTodos: this.state.othersTodos.filter(
        (item) => item._id !== todo._id
      ),
    });
  };
  getTodos = () => {
    return fetch("http://localhost:5000/todos", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.forEach((todo) => {
          todo.dueDate = new Date(todo.dueDate);
          todo.startDate = new Date(todo.startDate);

          this.setState((prevState) => ({
            todos: [...prevState.todos, todo],
            workTodos:
              todo.category === "Work"
                ? [...prevState.workTodos, todo]
                : [...prevState.workTodos],
            personalTodos:
              todo.category === "Personal"
                ? [...prevState.personalTodos, todo]
                : [...prevState.personalTodos],
            shoppingTodos:
              todo.category === "Shopping"
                ? [...prevState.shoppingTodos, todo]
                : [...prevState.shoppingTodos],
            othersTodos:
              todo.category === "Others"
                ? [...prevState.othersTodos, todo]
                : [...prevState.othersTodos],
          }));
        });
      });
  };

  async componentDidMount() {
    // console.log("mounting again");
    await this.getTodos();
  }

  handleTodos = (todo) => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
      todos: [...prevState.todos, todo],
      workTodos:
        todo.category === "Work"
          ? [...prevState.workTodos, todo]
          : [...prevState.workTodos],
      personalTodos:
        todo.category === "Personal"
          ? [...prevState.personalTodos, todo]
          : [...prevState.personalTodos],
      shoppingTodos:
        todo.category === "Shopping"
          ? [...prevState.shoppingTodos, todo]
          : [...prevState.shoppingTodos],
      othersTodos:
        todo.category === "Others"
          ? [...prevState.othersTodos, todo]
          : [...prevState.othersTodos],
    }));
  };
  showTodo = (category) => {
    if (category === "Work") {
      this.setState({
        todos: this.state.workTodos,
      });
    } else if (category === "Personal") {
      this.setState({
        todos: this.state.personalTodos,
      });
    } else if (category === "Shopping") {
      this.setState({
        todos: this.state.shoppingTodos,
      });
    } else if (category === "Others") {
      this.setState({
        todos: this.state.othersTodos,
      });
    } else if (category === "All") {
      this.setState({
        todos: [
          ...this.state.workTodos,
          ...this.state.personalTodos,
          ...this.state.shoppingTodos,
          ...this.state.othersTodos,
        ],
      });
    }
  };

  render() {
    return (
      <div className="container-fluid fill">
        <div className="row">
          <div className="sidebar-menu col-2 col-md-2">
            <Sidebar
              addTodo={this.handleTodos}
              showTodo={this.showTodo}
              countWork={this.state.workTodos.length}
              countPersonal={this.state.personalTodos.length}
              countShopping={this.state.shoppingTodos.length}
              countOthers={this.state.othersTodos.length}
            />
          </div>
          <div className="dashboard col-2 col-md-10">
            <Dashboard todos={this.state.todos} deleteTodo={this.deleteTodo} />
          </div>
        </div>
      </div>
    );
  }
}
