const { fork, ChildProcess } = require('child_process');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const { log } = require('console');


function init() {

    const filepath1 = path.resolve(__dirname, "childProcess.js")
    const child = fork(filepath1);
    const filepath = path.resolve(__dirname, "../reeloheader.png")
    child.send(filepath); 
    

    child.on('message', (message) => {
        console.log(message)
        if (message.error) {
            console.error('Error from child process:', message.error);
        } else if (message.status === 'done') {
            console.log('Image resized successfully!');
        }
    });


    child.on('disconnect', () => {
        console.log('Child process has been disconnected');
    })

    child.on('exit', () => {
        console.log('Child process has been closed')
        console.log("Respawning new one ...........")
        init()
    })
}


init()