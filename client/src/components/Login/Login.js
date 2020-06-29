import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import Ripples from "react-ripples";
import axios from "axios";
import { Link } from "react-router-dom";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      showPassword:false,
    };
  }
  showPassword=()=>{
    this.setState(prevState=>({
      showPassword:!prevState.showPassword,
    }))
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
    fetch(process.env.NODE_ENV==="production"?"https://whispering-falls-52777.herokuapp.com/login":
      "http://localhost:5000/login",

      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password,
        }),
      }
    )
      .then((res) => {
        if (res.statusText === "Unauthorized") {
          return { msg: "Invalid email or password" };
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.msg) this.props.showError(data.msg);
        else this.props.loginUser(data.userId, data.name);
      });
  };
  componentDidMount(){
    console.log("Login component mounted");
  }
  render() {
    return (
      <div className="card" id="login">
        <div className="card-header">Login</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label className="col-form-label">Username</label>
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
                type={this.state.showPassword?"text":"password"}
                value={this.state.password}
                onChange={this.handlePasswordChange}
                placeholder="Enter Password"
              />
              <span style={{fontSize:"12px"}}><input style={{width:"10px",height:"10px",margin:"5px"}}  type="checkbox" onClick={this.showPassword} />show password</span>
             
            </div>
            <span>
              New user ?<Link to="/signup"> Sign Up</Link>
            </span>
          </form>
        </div>
        <Ripples>
          <button onClick={this.checkUser} className="btn btn-primary">
            Login
          </button>
        </Ripples>
      </div>
    );
  }
}
