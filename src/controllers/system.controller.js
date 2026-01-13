const ScheduledMessage = require("../models/ScheduledMessage");

exports.scheduleMessage = async (req, res) => {
  try {
    const { message, day, time } = req.body;

    const scheduleTime = new Date(`${day} ${time}`);

    await ScheduledMessage.create({
      message,
      scheduleTime,
    });

    res.json({ success: true, message: "Message scheduled successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
