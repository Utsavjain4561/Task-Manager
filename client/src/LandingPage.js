import React, { Component } from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "./LandingPage.css";
import App from "./App";

export default class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      redirectUrl: "/user",
    };
  }
  loginUser = (userid) => {
    this.setState({
      isLoggedIn: true,
      redirectUrl: "/user?user_id=" + userid,
    });
  };
  signOutUser = () => {
    console.log("sign out clicked");
    this.setState({
      isLoggedIn: false,
    });
  };
  render() {
    return (
      <Router>
        <Route exact path="/">
          <Login loginUser={this.loginUser} />
        </Route>
        <Route path="/signup">
          <Register loginUser={this.loginUser} />
        </Route>
        <Route path="/user">
          <App signOutUser={this.signOutUser} />
        </Route>
        {this.state.isLoggedIn ? (
          <Redirect to={this.state.redirectUrl}></Redirect>
        ) : (
          <Redirect to="/"></Redirect>
        )}
      </Router>
    );
  }
}
