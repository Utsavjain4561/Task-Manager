const express = require("express"),
  router = express.Router(),
  User = require("../models/User"),
  { sendMail } = require("../api/sendMail");
module.exports = function (params) {
  passport = params.passport;

  //Register route
  router.post("/register", (req, res) => {
    console.log(req.body.name);
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
      }),
      password = req.body.password,
      name = req.body.name;

    User.register(user, password, (err, newUser) => {
      if (err) {
        res.status(400).json({ msg: err.message });
      } else {
        passport.authenticate("local")(req, res, () => {
          console.log("User registered");
          User.findByIdAndUpdate(newUser._id, { name: name }, (err, user) => {
            console.log("Updated user");

            res.status(200).json({ userId: newUser._id, name: name });
          });
        });
      }
    });
  });
  // Login route
  router.post("/login", passport.authenticate("local"), (req, res) => {
    User.findOne({ username: req.user.username }, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Login success!!");
        
        sendMail(user, params.transporter);
        res.json({ userId: user._id, name: user.name });
      }
    });
  });
  //Login failed
  router.get("/login/failed", (req, res) => {
    console.log("failed");
    res.redirect("https://www.google.com");
    // res.status(400).json({ msg: "Incorrect email or password" });
  });

  return router;
};
