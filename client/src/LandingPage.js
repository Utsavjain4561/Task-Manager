import React, { Component } from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "./LandingPage.css";
import App from "./App";
import { stat } from "fs";

export default class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      redirectUrl: "/user",
      userid:null,
    };
  }
  showError = (err) => {
    toast.configure();
    toast.error(err, {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      autoClose: 5000,
    });
    
  };
  loginUser = (userid, name) => {
    $(".heading").css("display", "none");
    $(".footer").css("display", "none");
    this.setState({
      isLoggedIn: true,
      userid:userid,
      redirectUrl: "/user?user_id=" + userid + "&name=" + name,
    });
    
   
  };
  signOutUser = () => {
  
    console.log("sign out clicked");
    fetch(process.env.NODE_ENV==="production"?"https://whispering-falls-52777.herokuapp.com/signout/"+this.state.userid
    :"http://localhost:5000/signout/"+this.state.userid,{
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      
    })
    .then(res=>{
      if(res.statusText==="OK"){
        this.setState({
      isLoggedIn: false,
    });
     window.location="/";
      }
    })
    
  };
  checkStatus=()=>{
    if(this.state.isLoggedIn)
    return true;
    else{
     
      return false;
    }
    
  }
 
  render() {
    return (
      <Router>
        <Route exact path="/">
          <Login showError={this.showError} loginUser={this.loginUser} />
        </Route>
        <Route path="/signup">
          <Register showError={this.showError} loginUser={this.loginUser} />
        </Route>
        <Route path="/user">
          <App isLoggedIn={this.checkStatus} showError={this.showError} signOutUser={this.signOutUser} />
        </Route>

        {this.state.isLoggedIn ? (
          <Redirect push to={this.state.redirectUrl}></Redirect>
        ) : (
          ""
        )}
        <div className="heading">
          <div className="title">
            <h1>Chores</h1>
            <p>Make,Track and complete your tasks !!</p>
          </div>

          <div className="thumbnail"></div>
        </div>
        <div className="footer"></div>
      </Router>
    );
  }
}
