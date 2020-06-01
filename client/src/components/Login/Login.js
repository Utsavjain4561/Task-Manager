import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  checkUser = () => {
    axios
      .post(
        "http://localhost:5000/login",
        JSON.stringify({
          username: this.state.email,
          password: this.state.password,
        }),
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => this.props.loginUser(res.data.userId, res.data.name));
  };
  render() {
    return (
      <div className="card" id="login">
        <div className="card-header">Login</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label className="col-form-label">Email</label>
              <input
                className="form-control"
                type="text"
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
            <span>
              New user ?<Link to="/signup"> Sign Up</Link>
            </span>
          </form>
        </div>
        <button onClick={this.checkUser} className="btn btn-primary">
          Login
        </button>
      </div>
    );
  }
}
