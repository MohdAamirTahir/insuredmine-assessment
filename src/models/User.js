// src/models/User.js
const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema({
    firstName: String,
    dob: Date,
    address: String,
    phone: String,
    state: String,
    zip: String,
    email: String,
    gender: String,
    userType: String,
  })
);
