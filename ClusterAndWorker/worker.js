const fs = require("fs");
const csv = require("csv-parser");
const {parent_port, workerData} = require("worker_threads")


const jsonFilePath = '../JSON/output3.json';

const results = [];
let chunkSize = 10000;
let currentChunk = [];
let workers = [];



const outputStream = fs.createWriteStream(jsonFilePath);

outputStream.write('[')
let firstRow = true;

fs.createReadStream("../uploads/first")
  .pipe(csv())
  .on("data", (row) => {
    
    

  })
  .on("error", (error) => {
    console.log(error.message);
  })
  .on("end", async() => {
    outputStream.write(']');
    outputStream.end();
    console.log('CSV has been successfully converted to JSON and saved.');
    console.log("finished");

  });
