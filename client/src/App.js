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
        let work = [],
          personal = [],
          shopping = [],
          others = [];
        data.forEach((todo) => {
          todo.dueDate = new Date(todo.dueDate);
          todo.startDate = new Date(todo.startDate);

          if (todo.category === "Work") {
            work.push(todo);
          } else if (todo.category === "Personal") {
            personal.push(todo);
          } else if (todo.category === "Shopping") {
            shopping.push(todo);
          } else {
            others.push(todo);
          }
          this.setState((prevState) => ({
            todos: [...prevState.todos, todo],
          }));
          if (work) {
            this.setState((prevState) => ({
              workTodos: [...prevState.workTodos, work],
            }));
          } else if (personal) {
            this.setState((prevState) => ({
              personalTodos: [...prevState.personalTodos, personal],
            }));
          } else if (shopping) {
            this.setState((prevState) => ({
              shoppingTodos: [...prevState.shoppingTodos, shopping],
            }));
          } else if (others) {
            this.setState((prevState) => ({
              othersTodos: [...prevState.othersTodos, others],
            }));
          }
        });
      });
  };
  async componentDidMount() {
    await this.getTodos();
  }

  handleTodos = (newTodo, category) => {
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
    }));
    if (category === "Work") {
      this.setState((prevState) => ({
        workTodos: [...prevState.workTodos, newTodo],
      }));
    } else if (category === "Personal") {
      this.setState((prevState) => ({
        personalTodos: [...prevState.personalTodos, newTodo],
      }));
    } else if (category === "Shopping") {
      this.setState((prevState) => ({
        shoppingTodos: [...prevState.shoppingTodos, newTodo],
      }));
    } else {
      this.setState((prevState) => ({
        othersTodos: [...prevState.othersTodos, newTodo],
      }));
    }
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
            <Dashboard todos={this.state.todos} />
          </div>
        </div>
      </div>
    );
  }
}
