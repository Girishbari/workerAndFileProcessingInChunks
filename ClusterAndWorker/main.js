const {Worker} = require("worker_threads")


const filePaths = ['../uploads/first','../uploads/updated_sample.csv' ,'../uploads/second']
let workers = [];

function init(){

    filePaths.forEach((file, index) => {
        const worker = new Worker("./worker2.js", {
            workerData : {file, index}
        })
        worker.on('message', (message) => {
            console.log(`Worker ${index} finished processing: ${message}`);
        })
    
        worker.on("error", (error) => {
            console.error(`Worker ${index} encountered an error:`, error);
        })

        worker.on('exit', (code) => {
            if (code !== 0) {
              console.error(`Worker ${index} stopped with exit code ${code}`);
            } else {
              console.log(`Worker ${index} finished successfully.`);
            }
          })
          workers.push(worker)
    })

}

init();