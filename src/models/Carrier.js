// src/models/Carrier.js
const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Carrier",
  new mongoose.Schema({
    company_name: String,
  })
);
