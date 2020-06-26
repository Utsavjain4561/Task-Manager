import React, { Component } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import { toast, Flip } from "react-toastify";
import $ from "jquery";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      name: "",
      todos: [],
      pending: 0,
      inprogress: 0,
      workTodos: [],
      personalTodos: [],
      shoppingTodos: [],
      othersTodos: [],
    };
  }

  getProgress = (todo) => {
    let currentDate = new Date(),
      dueDate = todo.dueDate,
      startDate = todo.startDate;

    if (todo.isChecked) return "Completed";
    else {
      if (currentDate.getTime() > dueDate.getTime()) return "Pending";
      if (currentDate.getTime() - startDate.getTime() < 3600000) return "New";

      return "In Progress";
    }
  };
  sort = (type) => {
    //sort todos according to type
    // and set state
    let items = this.state.todos;
    let priority = {
      Pending: 0,
      "In Progress": 1,
      New: 2,
      Completed: 3,
    };

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
        return priority[this.getProgress(a)] - priority[this.getProgress(b)];
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
    toast.success("Task Completed", {
      position: toast.POSITION.BOTTOM_LEFT,
      hideProgressBar: true,
      autoClose: 2000,
      transition: Flip,
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
    toast.dark("Todo deleted", {
      position: toast.POSITION.BOTTOM_LEFT,
      hideProgressBar: true,
      autoClose: 2000,
      transition: Flip,
    });
  };
  getTodos = (userId) => {
    console.log("NODE Enviornment",process.env.NODE_ENV)
    return fetch(process.env.NODE_ENV === "production"?"https://whispering-falls-52777.herokuapp.com/todos/"+ userId
    :"http://localhost:5000/todos/" + userId, {
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
    toast.configure();
    $(".heading").css("display", "none");
    $(".footer").css("display", "none");
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user_id");
    toast.dark("Logged in sucessfully !", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 1000,
      hideProgressBar: true,
    });
    await this.getTodos(userId);
    this.setState({
      userId: userId,
    });
    this.state.todos.forEach((todo) => {
      if (this.getProgress(todo) === "Pending") {
        this.setState((prevState) => ({
          pending: prevState.pending + 1,
        }));
      } else if (this.getProgress(todo) === "In Progress") {
        this.setState((prevState) => ({
          inprogress: prevState.inprogress + 1,
        }));
      }
    });
    if (this.state.pending > 0) {
      setTimeout(() => {
        toast.error(`${this.state.pending} tasks pending`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }, 3000);
    }
    if (this.state.inprogress > 0) {
      setTimeout(() => {
        toast.info(`${this.state.inprogress} tasks in progress`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }, 4000);
    }
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

    // scroll to bottom when new todo is added
    var elem = document.getElementById("data");
    elem.scrollTop = elem.scrollHeight;
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
              showError={this.props.showError}
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
