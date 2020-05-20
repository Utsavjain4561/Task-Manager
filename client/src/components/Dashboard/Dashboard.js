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
                    <span>Practice Javascript daily</span>
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
                      <FontAwesomeIcon icon={faEdit} />
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
                  style={{ background: "rgb(156,86,184)" }}
                  className="todo-progress"
                ></div>
                <div className="todo-title">
                  <span>Practice Javascript daily</span>
                  <span className="badge badge-success">Completed</span>
                </div>
              </div>
            </li>
            <li>
              <div className="todo-item">
                <div
                  style={{ background: "rgb(81,216,138)" }}
                  className="todo-progress"
                ></div>
                <div className="todo-title">
                  <span>Practice Javascript daily</span>
                  <span className="badge badge-success">Completed</span>
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
                  <span>Practice Javascript daily</span>
                  <span className="badge badge-danger">Pending</span>
                </div>
              </div>
            </li>
            <li>
              <div className="todo-item">
                <div
                  style={{ background: "rgb(81,216,138)" }}
                  className="todo-progress"
                ></div>
                <div className="todo-title">
                  <span>Practice Javascript daily</span>
                  <span className="badge badge-danger">Pending</span>
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
                  <span>Practice Javascript daily</span>
                  <span className="badge badge-primary">In progress</span>
                </div>
              </div>
            </li>
            <li>
              <div className="todo-item">
                <div
                  style={{ background: "rgb(81,216,138)" }}
                  className="todo-progress"
                ></div>
                <div className="todo-title">
                  <span>Practice Javascript daily</span>
                  <span className="badge badge-success">Completed</span>
                </div>
              </div>
            </li>
            <li>
              <div className="todo-item">
                <div
                  style={{ background: "rgb(81,216,138)" }}
                  className="todo-progress"
                ></div>
                <div className="todo-title">
                  <span>Practice Javascript daily</span>
                  <span className="badge badge-danger">Pending</span>
                </div>
              </div>
            </li>
            <li>
              <div className="todo-item">
                <div
                  style={{ background: "rgb(255,85,33)" }}
                  className="todo-progress"
                ></div>
                <div className="todo-title">
                  <span>Practice Javascript daily</span>
                  <span className="badge badge-success">Completed</span>
                </div>
              </div>
            </li>
            <li>
              <div className="todo-item">
                <div
                  style={{ background: "rgb(81,216,138)" }}
                  className="todo-progress"
                ></div>
                <div className="todo-title">
                  <span>Practice Javascript daily</span>
                  <span className="badge badge-success">Completed</span>
                </div>
              </div>
            </li>
            <li>
              <div className="todo-item">
                <div
                  style={{ background: "rgb(255,85,33)" }}
                  className="todo-progress"
                ></div>
                <div className="todo-title">
                  <span>Practice Javascript daily</span>
                  <span className="badge badge-success">Completed</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
