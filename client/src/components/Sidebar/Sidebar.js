import React from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSignOutAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
export default function Sidebar() {
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
        data-toggle="tooltip"
        data-placement="top"
        title="Add TODO"
        className="side-footer"
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
}
