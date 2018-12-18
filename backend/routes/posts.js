const express = require("express");
const Post = require("../models/post");
const router = express.Router();

// ADD A NEW POST
router.post("/", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post
    .save()
    .then(post => {
      res.status(201).json({
        message: "Post added successfully",
        postId: post._id
      });
    })
    .catch(error => {
      console.log(error);
    });
});
// FETCH POST BY ID
router.get("/:id", (req, res, next) => {
  if (req.params.id) {
    Post.findById(req.params.id)
      .then(post => {
        res
          .status(200)
          .json({ message: "Posts fetched successfully", post: post });
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    const post = null;
    res.status(301).json({ message: "Posts NOT fetched ", post: post });
  }
});
// FETCH  ALL POSTS
router.get("/", (req, res, next) => {
  Post.find()
    .then(document => {
      res
        .status(200)
        .json({ message: "Posts fetched successfully", posts: document });
    })
    .catch(error => {
      console.log(error);
    });
});

// UPDATE POST BY ID
router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post)
    .then(data => {
      res
        .status(200)
        .json({ message: "Post updated successfully", data: data });
    })
    .catch(error => {
      console.log(error);
    });
});
// DELETE POST  BY ID
router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({ message: "Post deleted successfully" });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
