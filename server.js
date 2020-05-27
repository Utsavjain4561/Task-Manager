const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Todos = require("./models/Todos"),
  app = express(),
  PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/stackhash", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/todos", (req, res) => {
  // get all todos from DB
  Todos.find({}, (err, todo) => {
    if (err) {
      console.log(err);
    } else {
      res.send(todo);
    }
  });
});
app.post("/todos/add", (req, res) => {
  // Create a new todo
  // Add the todo to databse

  Todos.create(req.body, (err, todo) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send();
    }
  });
});

app.listen(PORT, () => {
  console.log("Server started");
});
