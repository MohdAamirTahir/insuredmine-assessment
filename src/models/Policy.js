// src/models/Policy.js
const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Policy",
  new mongoose.Schema({
    policy_number: String,
    start_date: Date,
    end_date: Date,
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "LOB" },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Carrier" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  })
);
