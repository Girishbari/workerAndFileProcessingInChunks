const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const { pipeline } = require("stream/promises");


const upload = multer({ dest: "uploads/" });
const CHUNKS_DIR = "./uploads/chunks"
const app = express();

const port = 3000;

app.use(cors());

app.post("/upload", upload.single("file"), (req, res) => {
  const {
    file,
    body: { totalChunks, currentChunk },
  } = req;
  const chunkPath = `./uploads/chunks/${file.originalname}.${currentChunk}`;
  fs.rename(file.path, chunkPath, (err) => {
    if (err) {
      console.error("Error moving chunk file:", err);
      res.status(500).send("Error uploading chunk");
    } else {
      if (+currentChunk === +totalChunks) {
        // All chunks have been uploaded, assemble them into a single file
        assembleChunks(file.originalname, totalChunks)
          .then(() => res.send("File uploaded successfully"))
          .catch((err) => {
            console.error("Error assembling chunks:", err);
            res.status(500).send("Error assembling chunks");
          });
      } else {
        res.send("Chunk uploaded successfully");
      }
    }
  });

  async function assembleChunks(filename, totalChunks) {
    const writer = fs.createWriteStream(`./uploads/${filename}`);

    try {
      for (let i = 1; i <= totalChunks; i++) {
        const chunkPath = `${CHUNKS_DIR}/${filename}.${i}`;
        const chunkStream = fs.createReadStream(chunkPath);
        await pipeline(chunkStream, writer, { end: false });
        //console.log(`Chunk ${i} written successfully.`);
      }

      writer.end();
      console.log("File assembly completed successfully.");
    } catch (err) {
      console.error("Assembly failed:", err);
      writer.destroy();
      throw err;
    }
  }
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
