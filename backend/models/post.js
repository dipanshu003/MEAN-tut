const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: "No Content" },
});

module.exports = mongoose.model("Post", postSchema);

// const mongoose = require("mongoose");

// const postSchema = new mongoose.Schema({
//   _id: {
//     type: String,
//     default: () => new mongoose.Types.ObjectId().toString(), // convert ObjectId → string
//   },
//   title: { type: String, required: true },
//   content: { type: String, required: true },{versionKey: false}
// });

// module.exports = mongoose.model("Post", postSchema);
