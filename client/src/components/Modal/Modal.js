import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "bootstrap/dist/css/bootstrap.css";
import "./Modal.css";

import colorNames from "../utils/colorNames.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default class Modal extends Component {
  constructor() {
    super();
    this.state = {
      dueDate: new Date(),
      startDate: new Date(),
      title: "",
      category: "Others",
      showForm: false,
    };
  }
  getColor = (category) => {
    switch (category) {
      case "Work":
        return colorNames.colors[0];
      case "Personal":
        return colorNames.colors[1];
      case "Shopping":
        return colorNames.colors[2];
      case "Others":
        return colorNames.colors[3];
      default:
        return colorNames.colors[4];
    }
  };
  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
    // console.log(this.state.title);
  };
  handleChange = (date) => {
    this.setState({
      dueDate: date,
    });
    // console.log(this.state.dueDate);
  };
  handleCategory = (type) => {
    this.setState({
      category: type,
    });
  };
  handleFormSubmit = (event) => {
    this.handleShowForm();
    // Creat a new TODO item
    let color = this.getColor(this.state.category);

    let todo = {
      title: this.state.title,
      dueDate: this.state.dueDate,
      category: this.state.category,
      color: color,
      isChecked: false,
      startDate: new Date(),
    };

    //Adding the TODO to the main list
    // add todo to the database
    fetch("http://localhost:5000/todos/add/" + this.props.userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else {
          alert(JSON.stringify(res.statusText));
        }
      })
      .then((data) => {
        data.dueDate = new Date(data.dueDate);
        data.startDate = new Date(data.startDate);
        this.props.addTodo(data);
      });
  };
  handleShowForm = () => {
    this.setState((prevState) => ({
      showForm: !prevState.showForm,
    }));
  };

  render() {
    return (
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
                {this.props.showEditModal ? "Edit Todo" : "Add Todo"}
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
                        selected={this.state.dueDate}
                        onChange={this.handleChange}
                        dateFormat="dd MMM,yyyy"
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
                        style={{ backgroundColor: colorNames.colors[0] }}
                        type="button"
                        onClick={() => this.handleCategory("Work")}
                      >
                        W
                      </span>
                      <span
                        className="list-icon"
                        style={{ backgroundColor: colorNames.colors[1] }}
                        type="button"
                        onClick={() => this.handleCategory("Personal")}
                      >
                        P
                      </span>
                      <span
                        className="list-icon"
                        style={{ backgroundColor: colorNames.colors[2] }}
                        type="button"
                        onClick={() => this.handleCategory("Shopping")}
                      >
                        S
                      </span>
                      <span
                        className="list-icon"
                        style={{ backgroundColor: colorNames.colors[3] }}
                        type="button"
                        onClick={() => this.handleCategory("Others")}
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
                data-dismiss="modal"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
