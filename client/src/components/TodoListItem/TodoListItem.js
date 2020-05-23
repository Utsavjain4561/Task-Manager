import React, { Component } from "react";
import "./TodoListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import monthNames from "../utils/monthNames.json";
import {
  faClock,
  faBars,
  faEdit,
  faCheck,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
export default class TodoListItem extends Component {
  getBadge = (progress) => {
    if (progress === "New") return "badge-primary";
    else if (progress === "In Progress") return "badge-warning";
    else if (progress === "Completed") return "badge-success";
    return "badge-danger";
  };
  getProgress = () => {
    let currentDate = new Date("2020-05-25"),
      dueDate = this.props.todo.dueDate,
      startDate = this.props.todo.startDate;
    console.log("Current date ", currentDate.getTime());
    console.log("Due date ", dueDate.getTime());
    if (this.props.todo.isChecked) return "Completed";
    else {
      if (currentDate.getTime() - startDate.getTime() < 86400000) return "New";
      else if (currentDate.getTime() > dueDate.getTime()) return "Pending";
      return "In Progress";
    }
  };
  render() {
    return (
      <div className="todo-item">
        <div
          style={{ background: this.props.todo.color }} // Add particular category color
          className="todo-progress"
        ></div>
        <div className="todo-title">
          <div>
            <span>
              {this.props.todo.title} {/*   Add title of TODO */}
            </span>
            <span className={`badge ${this.getBadge(this.getProgress())}`}>
              {this.getProgress()}
            </span>
            {/*Add progress satus of TODO*/}
          </div>
          <div className="todo-subtitle">
            <span className="todo-type">
              <FontAwesomeIcon icon={faBars} />
              {this.props.todo.category} {/* Add Type of TODO */}
            </span>
            <span className="due-date">
              <FontAwesomeIcon icon={faClock} />
              {`${this.props.todo.dueDate.getDate()} ${
                monthNames.months[this.props.todo.dueDate.getMonth()]
              }`}
            </span>
            <span
              data-toggle="tooltip"
              data-placement="bottom"
              title="Delete"
              className="todo-delete"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
            <span
              data-toggle="tooltip"
              data-placement="bottom"
              title="Edit"
              style={{ display: this.props.todo.isChecked ? "none" : "" }}
              className="todo-edit"
            >
              <FontAwesomeIcon icon={faEdit} />
            </span>
            <span
              data-toggle="tooltip"
              data-placement="bottom"
              title="Done"
              style={{ display: this.props.todo.isChecked ? "none" : "" }}
              onClick={() => this.setState({ isChecked: true })}
              className="todo-complete"
            >
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </div>
        </div>
      </div>
    );
  }
}
