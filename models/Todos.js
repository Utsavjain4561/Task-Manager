const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dueDate: Date,
  startDate: Date,
  category: String,
  color: String,
  isChecked: Boolean,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Todo", todoSchema);
