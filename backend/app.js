const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");

mongoose
  .connect(
    `mongodb+srv://meanBlogAdmin680:XzIKXoSvxhOUif7X@cluster0-fqu2h.mongodb.net/node-angular?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(data => {
    // console.log(data);
  })
  .catch(error => {
    console.log("connection error: " + error);
  });
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );

  next();
});
app.use("/api/posts", postRoutes);
module.exports = app;
