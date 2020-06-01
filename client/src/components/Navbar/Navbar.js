import React, { Component } from "react";
import "./Navbar.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Searchbar from "../Searchbar/Searchbar";
import colorNames from "../utils/colorNames.json";
export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    this.setState({
      name: name,
    });
  }
  getRandomColor = () => {
    let colors = colorNames.colors,
      l = colors.length,
      r = colors[Math.floor(Math.random() * l)];

    return r;
  };
  render() {
    return (
      <div className="navbar navbar-expand-lg">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <div
              style={{ background: this.getRandomColor() }}
              className="user-icon"
            >
              {this.state.name[0]}
            </div>
            <span style={{ fontSize: "16px" }}>{this.state.name}</span>
          </li>
          <li className="nav-item">
            <div className="dropdown">
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
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <span
                  className="dropdown-item"
                  onClick={() => this.props.sort("date")}
                >
                  Date-Time
                </span>
                <span
                  className="dropdown-item"
                  onClick={() => this.props.sort("priority")}
                >
                  Priority
                </span>
                <span
                  className="dropdown-item"
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
