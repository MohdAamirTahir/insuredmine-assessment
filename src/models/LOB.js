// src/models/LOB.js
const mongoose = require("mongoose");

module.exports = mongoose.model(
  "LOB",
  new mongoose.Schema({
    category_name: String,
  })
);
