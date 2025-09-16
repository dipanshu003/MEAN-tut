const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Post = require("./models/post");

const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

//1. Get all posts API
app.get("/api/getAllPosts", (req, res, next) => {
  const posts = [
    {
      id: "jshjdfh82734",
      title: "First Posts",
      post: "We are writing first post",
    },
    {
      id: "oirpoit9",
      title: "Second Posts",
      post: "We are writing second post",
    },
  ];

  res.status(200).json({
    message: "Fetched posts successfully!",
    data: posts,
  });
});

// 2. save post API
app.post("/api/savePost", (req, res, next) => {
  // console.log(req.body);

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  console.log(post);

  res.status(200).json({
    message: "Post saved successfully!",
  });
});

module.exports = app;
