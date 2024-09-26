const fs = require('fs')


const outputStream = fs.createWriteStream("./output4.json")


outputStream.write("helo world")