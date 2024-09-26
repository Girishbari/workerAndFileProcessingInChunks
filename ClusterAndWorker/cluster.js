const cluster = require("node:cluster");
const os = require("os");
const express = require('express')

const app = express();
const port = 3000;

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

} else {
  app.get("/", (req, res) => {
    res.json({message : `Hello World! ${process.pid}`});
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
