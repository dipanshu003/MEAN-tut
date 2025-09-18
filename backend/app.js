const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require("./models/post");

const app = express();

// db connection with mongoose
mongoose
  .connect("mongodb://localhost:27017/mean-tut")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// 1. Get all posts API
app.get("/api/getAllPosts", (req, res, next) => {
  Post.find()
    .then((posts) => {
      //transform the posts
      const transformedPost = posts.map((post) => {
        return {
          id: post._id,
          title: post.title,
          content: post.content,
        };
      });

      res.status(200).json({
        message: "Fetched posts successfully!",
        data: transformedPost,
      });
    })
    .catch((err) => {
      console.error("Error fetching posts:", err);
      res.status(500).json({
        message: "Fetching posts failed!",
        error: err.message,
      });
    });
});

// 2. Save post API
app.post("/api/savePost", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  post
    .save()
    .then((savedPost) => {
      res.status(201).json({
        message: "Post saved successfully!",
        data: savedPost,
      });
    })
    .catch((err) => {
      console.error("Error saving post:", err);
      res.status(500).json({
        message: "Saving post failed!",
        error: err.message,
      });
    });
});

// 3. Fetch post by ID
app.get("/api/getPostById/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found!" });
      }

      const transformedPost = {
        id: post._id,
        title: post.title,
        content: post.content,
      };

      res.status(200).json({
        message: "Post fetched successfully!",
        data: transformedPost,
      });
    })
    .catch((err) => {
      console.error("Error fetching post by ID:", err);
      res.status(500).json({
        message: "Fetching post failed!",
        error: err.message,
      });
    });
});

module.exports = app;
