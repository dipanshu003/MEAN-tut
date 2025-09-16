const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, default: "No Content" },
});

module.exports = mongoose.model("Post", postSchema);
