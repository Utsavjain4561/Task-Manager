import React, { Component } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      todos: [],

      workTodos: [],
      personalTodos: [],
      shoppingTodos: [],
      othersTodos: [],
    };
  }

  sort = (type) => {
    //sort todos according to type
    // and set state
    let items = this.state.todos;
    if (type === "priority") {
      items.sort((a, b) => {
        return a.dueDate - b.dueDate;
      });
    } else if (type === "date") {
      items.sort((a, b) => {
        return a.startDate - b.startDate;
      });
    } else if (type === "label") {
      items.sort((a, b) => {
        if (a.category < b.category) return -1;
        if (a.category > b.category) return 1;
        return 0;
      });
    }
    this.setState({
      todos: items,
    });
  };
  checkTodo = (todo) => {
    //update status of this todo in state
    let index = this.state.todos.findIndex((item) => item._id === todo._id),
      items = this.state.todos;
    items[index].isChecked = true;
    this.setState({
      todos: items,
    });
  };
  deleteTodo = (todo) => {
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
  getTodos = (userId) => {
    return fetch("http://localhost:5000/todos/" + userId, {
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
    console.log("mounting again");
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user_id");
    await this.getTodos(userId);
    this.setState({
      userId: userId,
    });
  }
  componentWillUnmount() {
    this.props.signOutUser();
  }

  handleTodos = (todo) => {
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
      let items = [
        ...this.state.workTodos,
        ...this.state.personalTodos,
        ...this.state.shoppingTodos,
        ...this.state.othersTodos,
      ];
      items.sort((a, b) => {
        return a.startDate - b.startDate;
      });
      this.setState({
        todos: items,
      });
    }
  };
  showSearchTodo = (todo) => {
    let searched = [];
    searched.push(todo);
    console.log("searched", searched);
    this.setState({
      todos: searched,
    });
  };
  render() {
    return (
      <div className="container-fluid fill">
        <div className="row">
          <div className="sidebar-menu col-2 col-md-2">
            <Sidebar
              addTodo={this.handleTodos}
              showTodo={this.showTodo}
              userId={this.state.userId}
              signOutUser={this.props.signOutUser}
              countWork={this.state.workTodos.length}
              countPersonal={this.state.personalTodos.length}
              countShopping={this.state.shoppingTodos.length}
              countOthers={this.state.othersTodos.length}
            />
          </div>
          <div className="dashboard col-2 col-md-10">
            <Dashboard
              todos={this.state.todos}
              userId={this.state.userId}
              checkTodo={this.checkTodo}
              showSearchTodo={this.showSearchTodo}
              showTodo={this.showTodo}
              deleteTodo={this.deleteTodo}
              sort={this.sort}
            />
          </div>
        </div>
      </div>
    );
  }
}
