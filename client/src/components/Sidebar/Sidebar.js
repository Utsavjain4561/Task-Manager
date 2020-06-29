import React, { Component } from "react";
import "./Sidebar.css";
import Modal from "../Modal/Modal";
import Ripples from "react-ripples";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSignOutAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      category:"All",
    };
  }
  handleClickItem = (category) => {
    this.setState({
      category:category,
    })
    this.props.showTodo(category);
  };
  componentDidUpdate() {
    console.log("State changed to ", this.state.showForm);
  }
  render() {
    return (
      <div className="side-menu">
        <div className="side-header">
          <span className="header-icon">
            <FontAwesomeIcon icon={faBars} />
          </span>
          <span className="header-title">Chores</span>
        </div>
        <div className="side-body">
          <ul>
            <span
              
              className="menu-title"
              onClick={() => this.handleClickItem("All")}
            >
              Category
            </span>
            <li style={{backgroundColor:this.state.category==="Work"?"rgb(0,0,0)":""}}>
              <div className="menu-list">
                <div
                  style={{ backgroundColor: "rgb(43,151,224)" }}
                  className="list-icon"
                >
                  W
                </div>
                <span
                  onClick={() => {
                    this.handleClickItem("Work");
                  }}
                >
                  Work
                </span>
                <span className="count">{this.props.countWork}</span>
              </div>
            </li>
            <li style={{backgroundColor:this.state.category==="Personal"?"rgb(0,0,0)":""}}>
              <div className="menu-list">
                <div
                  style={{ backgroundColor: "rgb(156,86,184)" }}
                  className="list-icon"
                >
                  P
                </div>
                <span onClick={() => this.handleClickItem("Personal")}>
                  Personal
                </span>
                <span className="count">{this.props.countPersonal}</span>
              </div>
            </li>
            <li style={{backgroundColor:this.state.category==="Shopping"?"rgb(0,0,0)":""}}>
              <div className="menu-list">
                <div
                  style={{ backgroundColor: "rgb(81,216,138)" }}
                  className="list-icon"
                >
                  S
                </div>
                <span onClick={() => this.handleClickItem("Shopping")}>
                  Shopping
                </span>
                <span className="count">{this.props.countShopping}</span>
              </div>
            </li>
            <li style={{backgroundColor:this.state.category==="Others"?"rgb(0,0,0)":""}}>
              <div className="menu-list">
                <div
                  style={{ backgroundColor: "rgb(255,85,33)" }}
                  className="list-icon"
                >
                  O
                </div>
                <span onClick={() => this.handleClickItem("Others")}>
                  Others
                </span>
                <span className="count">{this.props.countOthers}</span>
              </div>
            </li>
            <li>
              <div className="menu-list">
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span onClick={() => this.props.signOutUser()}>Sign Out</span>
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
          <Ripples>
            <button
              style={{
                background: "none",
                border: "none",
                color: "white",
                outline: "none",
              }}
              data-toggle="modal"
              data-target="#add-task-modal"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </Ripples>
        </div>
        <Modal
          showError={this.props.showError}
          userId={this.props.userId}
          addTodo={this.props.addTodo}
        />
      </div>
    );
  }
}
