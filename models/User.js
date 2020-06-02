const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
