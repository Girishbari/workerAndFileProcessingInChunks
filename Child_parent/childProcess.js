const { fork } = require('child_process');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const { log } = require('console');

process.on('message', (filePath) => {

    if (!filePath) {
        process.send({ error: 'File path is empty or invalid.' });
        process.disconnect();
    }
    const outputFilePath = path.join('uploads', 'thumbnail_' + path.basename(filePath));
    sharp(filePath)
        .resize(200, 200)
        .toFile(outputFilePath)
        .then(() => {
            process.send({ status: 'done' });
            setTimeout(() => {
                process.exit();
            }, 1000 * 20)
            //process.disconnect();
        })
        .catch((err) => {
            console.error('Error resizing image:', err);
        });
});


