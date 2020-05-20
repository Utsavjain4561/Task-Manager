import React, { Component } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
export default class App extends Component {
  render() {
    return (
      <div className="container-fluid fill">
        <div className="row">
          <div className="sidebar-menu col-2 col-md-2">
            <Sidebar />
          </div>
          <div className="dashboard col-2 col-md-10">
            <Dashboard />
          </div>
        </div>
      </div>
    );
  }
}
