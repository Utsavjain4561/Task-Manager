import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Register.css";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
  }
  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handleEmailChange = (e) => {
    let value = e.target.value;
    this.setState({
      email: value,
    });
  };
  handlePasswordChange = (e) => {
    let value = e.target.value;
    this.setState({
      password: value,
    });
  };
  handleConfirmPassword = (e) => {
    let value = e.target.value;
    this.setState({
      confirmPassword: value,
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      // make api call to register user
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password,
          name: this.state.username,
        }),
      })
        .then((res) => {
          if (res.statusText === "OK") {
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
          this.props.loginUser(data.userId, data.name);
        });
    } else {
      // Show flash about error
    }
  };

  render() {
    return (
      <div className="card" id="login">
        <div className="card-header">Sign Up</div>
        <div className="card-body">
          <form id="register">
            <div className="form-group">
              <label className="col-form-label">Name</label>
              <input
                className="form-control"
                type="text"
                value={this.state.username}
                onChange={this.handleUsernameChange}
                placeholder="Enter Name"
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Email</label>
              <input
                className="form-control"
                type="text"
                name="username"
                value={this.state.email}
                onChange={this.handleEmailChange}
                placeholder="Enter Email"
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Password</label>
              <input
                className="form-control"
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                placeholder="Enter Password"
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Confirm Password</label>
              <input
                className="form-control"
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleConfirmPassword}
                placeholder="Enter Password"
              />
            </div>
            <span id="note">
              Already a member ?<Link to="/"> Login</Link>
            </span>
          </form>
        </div>
        <button onClick={this.handleFormSubmit} className="btn btn-primary">
          Sign Up
        </button>
      </div>
    );
  }
}
