const express = require("express"),
  router = express.Router(),
  Todos = require("../models/Todos"),
  User = require("../models/User");

// Get TODOS
router.get("/:id", (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      Todos.find({ userId: req.params.id }, (err, todos) => {
        if (err) console.log(err);
        else {
          res.send(todos);
        }
      });
    }
  });
});

//Create Route
router.post("/add/:id", (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      req.body.userId = req.params.id;
      Todos.create(req.body, (err, todo) => {
        if (err) {
          console.log(err);
          res.status(400).json({ msg: "Enter a TODO name" });
        } else {
          user.todos.push(todo);
          user.save();
          res.status(200).send(todo);
        }
      });
    }
  });
});

//Delete route
router.delete("/:id", (req, res) => {
  console.log("Delete ", req.params.id);
  Todos.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send();
    }
  });
});

// EDIT route
router.put("/check/:id", (req, res) => {
  req.body.isChecked = true;
  Todos.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send();
    }
  });
});

module.exports = router;
