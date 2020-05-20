import React, { Component } from "react";
import "./Navbar.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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
                <a class="dropdown-item" href="#">
                  Date-Time
                </a>
                <a class="dropdown-item" href="#">
                  Priority
                </a>
                <a class="dropdown-item" href="#">
                  Label
                </a>
              </div>
            </div>
          </li>
        </ul>
        <div className="search-bar">
          <form onClick={(event) => event.preventDefault()}>
            <input
              type="input"
              onChange={(event) => console.log(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  console.log(event.target.value);
                }
              }}
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
    );
  }
}
