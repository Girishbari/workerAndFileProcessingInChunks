const fs = require("fs");
const csv = require("csv-parser");
const { workerData, parentPort } = require("worker_threads");
// working

const { file, index } = workerData;
const fileReadStream = fs.createReadStream(file);
const fileOutputStream = fs.createWriteStream(`../JSON/output${index}.json`);

fileOutputStream.write("[");
fileReadStream
  .on("data", (chunk) => {
    return chunk;
  })
  .pipe(csv())
  .on("data", (row) => {
    //  fileOutputStream.write(`${JSON.stringify(row)},`);
    // above line is problematic even after last ele it adds the comma
  })
  .on("end", () => {
    fileOutputStream.write("]");
    fileOutputStream.end();
    parentPort.postMessage(`File ${file} processed successfully.`);
  })
  .on("error", (err) => {
    parentPort.postMessage(`Error processing ${file}: ${err.message}`);
  });
