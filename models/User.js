const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose"),
  validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate: [{ validator: validator.isEmail, msg: "Invalid email address" }],
  },
  password: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    minlength: [5, "Name should be atleast  5 characters long"],
    maxlength: [20, "Name should not exceed 15 characters"],
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
