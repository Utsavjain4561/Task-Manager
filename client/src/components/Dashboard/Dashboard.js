import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faBars,
  faEdit,
  faCheck,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
export default class Dashboard extends Component {
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
      <div className="container-fluid">
        <Navbar />
        <div className="content">
          <ul className="todo-list">
            <li>
              <div className="todo-item">
                <div
                  style={{ background: "rgb(43,151,224)" }}
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
                      Practice Javascript daily
                    </span>
                    <span className="badge badge-primary">In progress</span>
                  </div>
                  <div className="todo-subtitle">
                    <span className="todo-type">
                      <FontAwesomeIcon icon={faBars} />
                      Work
                    </span>
                    <span className="due-date">
                      <FontAwesomeIcon icon={faClock} />5 May
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
                      <FontAwesomeIcon
                        onClick={this.handleEdit}
                        icon={faEdit}
                      />
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
            </li>
            <li>
              <div className="todo-item">
                <div
                  style={{ background: "rgb(43,151,224)" }}
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
                      Practice Javascript daily
                    </span>
                    <span className="badge badge-primary">In progress</span>
                  </div>
                  <div className="todo-subtitle">
                    <span className="todo-type">
                      <FontAwesomeIcon icon={faBars} />
                      Work
                    </span>
                    <span className="due-date">
                      <FontAwesomeIcon icon={faClock} />5 May
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
                      <FontAwesomeIcon
                        onClick={this.handleEdit}
                        icon={faEdit}
                      />
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
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
