const os = require("os-utils");

setInterval(() => {
  os.cpuUsage((usage) => {
    if (usage * 100 > 70) {
      console.log("CPU Limit Exceeded. Restarting...");
      process.exit(1);
    }
  });
}, 5000);




