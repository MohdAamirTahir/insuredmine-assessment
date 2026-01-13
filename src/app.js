const express = require("express");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", require("./routes/upload.routes"));
app.use("/api", require("./routes/policy.routes"));
app.use("/api", require("./routes/system.routes"));

// Health check
app.get("/", (req, res) => {
  res.send("InsuredMine Assignment API Running");
});

module.exports = app;
