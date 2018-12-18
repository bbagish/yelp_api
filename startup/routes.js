const express = require("express");
const error = require("../middleware/error");
const camgrounds = require("../routes/campgrounds");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/campgrounds", camgrounds);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
