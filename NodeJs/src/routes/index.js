const express = require("express");
const UserRouter = require("./UsersRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
function route(app) {
  app.use("/api/users", UserRouter);
  app.use("/api/products", ProductRouter);
  app.use("/api/orders", OrderRouter);
}

module.exports = route;
