import React, { Component } from "react";
import "./TodoListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faBars,
  faEdit,
  faCheck,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
export default class TodoListItem extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
    };
  }
  handleEdit = () => {
    document.querySelector("body").style.opacity = "0.5";
    this.setState((prevState) => ({
      edit: !prevState.edit,
    }));
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
            <span
              contentEditable={this.state.edit}
              onBlur={(event) => {
                console.log(event.target.textContent);
                this.handleEdit();
              }}
            >
              {this.props.todo.title} {/*   Add title of TODO */}
            </span>
            <span className="badge badge-primary">In progress</span>{" "}
            {/*Add progress satus of TODO*/}
          </div>
          <div className="todo-subtitle">
            <span className="todo-type">
              <FontAwesomeIcon icon={faBars} />
              {this.props.todo.category} {/* Add Type of TODO */}
            </span>
            <span className="due-date">
              <FontAwesomeIcon icon={faClock} />
              {this.props.todo.dueDate}
              {/*Add due date of TODO */}
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
              className="todo-edit"
            >
              <FontAwesomeIcon onClick={this.handleEdit} icon={faEdit} />
            </span>
            <span
              data-toggle="tooltip"
              data-placement="bottom"
              title="Done"
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
