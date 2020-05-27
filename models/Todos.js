const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  title: String,
  dueDate: Date,
  startDate: Date,
  category: String,
  color: String,
  isChecked: Boolean,
});
module.exports = mongoose.model("Todo", todoSchema);
