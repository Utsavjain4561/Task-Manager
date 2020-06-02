const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  path = require("path"),
  cors = require("cors"),
  nodemailer = require("nodemailer"),
  hbs = require("nodemailer-express-handlebars"),
  cron = require("node-cron"),
  LocalStrategy = require("passport-local"),
  expressSession = require("express-session"),
  Todos = require("./models/Todos"),
  User = require("./models/User"),
  app = express(),
  PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/stackhash", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "faketaxiforyou@gmail.com",
    pass: "suddendeath123@",
  },
});

// Configure Passport
app.use(
  expressSession({
    secret: "Life with a plan is a happy life",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Register route
app.post("/register", (req, res) => {
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
      console.log(err);
      res.status(400).json(err);
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
//Check progress
function getProgress(todo) {
  let currentDate = new Date(),
    dueDate = todo.dueDate,
    startDate = todo.startDate;

  if (todo.isChecked) return "Completed";
  else {
    if (currentDate.getTime() > dueDate.getTime()) return "Pending";
    if (currentDate.getTime() - startDate.getTime() < 3600000) return "New";

    return "In Progress";
  }
}
//Pending tasks
function getPendingTasks(user) {
  console.log("User is", user);
  let pending = [];
  Todos.find({ userId: user._id }, (err, todos) => {
    if (err) {
      console.log(err);
    } else {
      todos.forEach((todo) => {
        if (getProgress(todo) === "Pending") {
          pending.push(todo);
        }
      });

      let mailOptions = {
        from: "faketaxiforyou@gmail.com",
        to: user.username,
        subject: "Chores: Complete your pending tasks",
        text: "Hello",
      };
      cron.schedule(
        "59 23 * * *",
        () => {
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Email sendt: ", +info.response);
            }
          });
        },
        {
          scheduled: true,
          timezone: "Asia/Kolkata",
        }
      );
    }
  });
}
//Mail user
function sendEmail(user) {
  getPendingTasks(user);
}
// Login route
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    User.findOne({ username: req.user.username }, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        sendEmail(user);
        res.json({ userId: user._id, name: user.name });
      }
    });
  }
);
app.get("/login/failed", (req, res) => {
  console.log("failed");
});

// Get all todos
app.get("/todos/:id", (req, res) => {
  // get all todos from DB
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
app.post("/todos/add/:id", (req, res) => {
  // Create a new todo
  // Add the todo to databse
  console.log(req.body);
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      req.body.userId = req.params.id;
      Todos.create(req.body, (err, todo) => {
        if (err) {
          console.log(err);
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
app.delete("/todos/:id", (req, res) => {
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
app.put("/todos/check/:id", (req, res) => {
  req.body.isChecked = true;
  Todos.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
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
