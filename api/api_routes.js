const express = require("express")
const multer = require("multer");

const router = express.router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { imageUpload, deleteImage } = require("./controllers/api_controllers.js")

app.post("/upload", upload.single("ImagePrompt"), imageUpload);
app.post("/deleteImage", deleteImage);


module.exports = router;
