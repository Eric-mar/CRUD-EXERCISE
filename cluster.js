const cluster = require("cluster");
const os = require("os");
const express = require("express");
const app = express();

const cpuCount = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
    cluster.fork()
  }
} else {
  app.get("/", (req, res) => {
    res.send(`you are connected to the ${process.pid}`);
  });
  app.listen(8000, () => {
    console.log(`you are listening to ${process.pid}`);
  });
}
