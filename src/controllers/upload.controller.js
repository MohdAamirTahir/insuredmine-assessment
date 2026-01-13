const { Worker } = require("worker_threads");
const path = require("path");

exports.uploadFile = (req, res) => {
  const worker = new Worker(
    path.join(__dirname, "../workers/fileWorker.js"),
    {
      workerData: { filePath: req.file.path },
    }
  );

  worker.on("message", () => {
    res.json({ message: "File processed successfully" });
  });

  worker.on("error", (err) => {
    res.status(500).json({ error: err.message });
  });
};
