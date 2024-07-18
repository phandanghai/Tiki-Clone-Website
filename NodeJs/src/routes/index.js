const express = require("express");
const ProductRouter = require("./ProductRouter");
function route(app) {
  app.use("/api/products", ProductRouter);
}

module.exports = route;
