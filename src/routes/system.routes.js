const express = require("express");
const { scheduleMessage } = require("../controllers/system.controller");

const router = express.Router();

router.post("/schedule-message", scheduleMessage);

module.exports = router;
