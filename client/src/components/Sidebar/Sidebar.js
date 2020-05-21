import React, { Component } from "react";
import "./Sidebar.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSignOutAlt,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export default class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date(),
      title: "",
      category: "",
      showForm: false,
    };
  }
  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
    // console.log(this.state.title);
  };
  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
    console.log(this.state.startDate);
  };
  handleCategory = (type) => {
    this.setState({
      category: type,
    });
  };
  handleFormSubmit = (event) => {
    this.handleShowForm();
    console.log(this.state);
  };
  handleShowForm = () => {
    console.log("Form show", this.state.showForm);
    this.setState((prevState) => ({
      showForm: !prevState.showForm,
    }));
  };
  render() {
    return (
      <div className="side-menu">
        <div className="side-header">
          <span className="header-icon">
            <FontAwesomeIcon icon={faBars} />
          </span>
          <span className="header-title">Task Manager</span>
        </div>
        <div className="side-body">
          <ul>
            <span className="menu-title">Category</span>
            <li>
              <div className="menu-list">
                <div
                  style={{ backgroundColor: "rgb(43,151,224)" }}
                  className="list-icon"
                >
                  W
                </div>
                <span>Work</span>
                <span className="count">12</span>
              </div>
            </li>
            <li>
              <div className="menu-list">
                <div
                  style={{ backgroundColor: "rgb(156,86,184)" }}
                  className="list-icon"
                >
                  P
                </div>
                <span>Personal</span>
                <span className="count">6</span>
              </div>
            </li>
            <li>
              <div className="menu-list">
                <div
                  style={{ backgroundColor: "rgb(81,216,138)" }}
                  className="list-icon"
                >
                  S
                </div>
                <span>Shopping</span>
                <span className="count">0</span>
              </div>
            </li>
            <li>
              <div className="menu-list">
                <div
                  style={{ backgroundColor: "rgb(255,85,33)" }}
                  className="list-icon"
                >
                  O
                </div>
                <span>Others</span>
                <span className="count">2</span>
              </div>
            </li>
            <li>
              <div className="menu-list">
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Sign Out</span>
              </div>
            </li>
          </ul>
        </div>
        <div
          className="side-footer"
          data-toggle="tooltip"
          data-placement="top"
          title="Add TODO"
        >
          <button
            style={{
              background: "none",
              border: "none",
              color: "white",
              outline: "none",
            }}
            onClick={this.handleShowForm}
            data-toggle="modal"
            data-target="#add-task-modal"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div
          className="modal fade"
          id="add-task-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div
              style={{ color: "black", fontWeight: "400" }}
              className="modal-content"
            >
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">
                  Add TODO
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span onClick={this.handleShowForm} area-hidden="true">
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label className="col-form-label">Title</label>
                    <input
                      type="text"
                      placeholder="Enter TODO name"
                      className="form-control"
                      value={this.state.title}
                      onChange={this.handleTitleChange}
                    ></input>
                  </div>

                  <div className="form-group">
                    <label className="col-form-label">Due Date</label>
                    <div style={{ height: "100%", width: "100%" }}>
                      <div
                        style={{
                          float: "left",
                          width: "60%",
                        }}
                      >
                        <DatePicker
                          style={{ color: "#495057" }}
                          selected={this.state.startDate}
                          onChange={this.handleChange}
                          dateFormat="dd MMMM,yyyy"
                        />
                      </div>
                      <div
                        id="list-options"
                        style={{
                          float: "left",
                          width: "40%",
                          margin: "0",
                        }}
                      >
                        <span
                          className="list-icon"
                          style={{ backgroundColor: "rgb(43,151,224)" }}
                          type="button"
                          onClick={() => this.handleCategory("W")}
                        >
                          W
                        </span>
                        <span
                          className="list-icon"
                          style={{ backgroundColor: "rgb(156,86,184)" }}
                          type="button"
                          onClick={() => this.handleCategory("P")}
                        >
                          P
                        </span>
                        <span
                          className="list-icon"
                          style={{ backgroundColor: "rgb(81,216,138)" }}
                          type="button"
                          onClick={() => this.handleCategory("S")}
                        >
                          S
                        </span>
                        <span
                          className="list-icon"
                          style={{ backgroundColor: "rgb(255,85,33)" }}
                          type="button"
                          onClick={() => this.handleCategory("O")}
                        >
                          O
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  onClick={this.handleFormSubmit}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
