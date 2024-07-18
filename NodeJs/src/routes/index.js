const express = require("express");
const UserRouter = require("./UsersRouter");
function route(app) {
  app.use("/api/users", UserRouter);
}

module.exports = route;
