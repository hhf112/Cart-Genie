require("dotenv").config()
const cors = require("cors")
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { warn } = require("console");
const cloudinary = require('cloudinary').v2;



const PORT = process.env.PORT;
const app = express();

app.use(express.json())
app.use(cors());


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});




//router to be added
app.post("/upload", upload.single("ImagePrompt"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "imagePrompts" },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        })

      uploadStream.end(fileBuffer);
    })

    if (result) {
      console.log(result)
      res.status(200).json({
        key: result.public_id,
      })
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err })
  }
})


app.post("/deleteImage", async (req, res) => {
  cloudinary.uploader.destroy(req.body.key, {}).then((resp) => {
    if (resp.result != "ok") res.status(500).send("failed to delete image");
    else res.status(200).send("successfully deleted image")
  });
});


app.listen(PORT, () => {
  console.log(PORT);
})



