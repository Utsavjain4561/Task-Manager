import React, { Component } from "react";
import "./Navbar.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Searchbar from "../Searchbar/Searchbar";
export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar navbar-expand-lg">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <div className="user-icon">U</div>
            <span style={{ fontSize: "16px" }}>Utsav Jain</span>
          </li>
          <li className="nav-item">
            <div class="dropdown">
              <span
                className="dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort
              </span>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <span
                  class="dropdown-item"
                  onClick={() => this.props.sort("date")}
                >
                  Date-Time
                </span>
                <span
                  class="dropdown-item"
                  onClick={() => this.props.sort("priority")}
                >
                  Priority
                </span>
                <span
                  class="dropdown-item"
                  onClick={() => this.props.sort("label")}
                >
                  Label
                </span>
              </div>
            </div>
          </li>
        </ul>
        <Searchbar
          showSearchTodo={this.props.showSearchTodo}
          showTodo={this.props.showTodo}
          titles={this.props.todos}
        />
      </div>
    );
  }
}
