const express = require("express"),
  dotenv = require("dotenv"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  cors = require("cors"),
  User = require("./models/User"),
  LocalStrategy = require("passport-local"),
  expressSession = require("express-session"),
  nodemailer = require("nodemailer"),
  hbs = require("nodemailer-express-handlebars"),
  todosRoutes = require("./routes/todos"),
  app = express(),
  PORT = process.env.PORT || 5000,
  DB_URL =process.env.DB_URL ||  "mongodb://localhost:27017/stackhash"

dotenv.config();

app.use(bodyParser.json());
app.use(cors());
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
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

//nodemailer configuration
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
});
transporter.use(
  "compile",
  hbs({
    viewEngine: {
      layoutsDir: __dirname + "/views/layouts",
      partialsDir: __dirname + "/views/layouts/partials",
      defaultLayout: "mail",
    },
    viewPath: __dirname + "/views/layouts",
  })
);
//setup auth routes
const authRoutes = require("./routes/auth")({
  transporter: transporter,
  passport: passport,
});

app.use("/", authRoutes);
app.use("/todos", todosRoutes);

app.listen(PORT, () => {
  console.log("Server started");
});
