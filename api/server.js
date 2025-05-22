require("dotenv").config()
const cors = require("cors")
const express = require("express");
const multer = require("multer");
const fs = require("fs")


const PORT = process.env.PORT;
const app = express();

app.use(express.json())
app.use(cors());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./query/")
  },
  filename: function (req, file, cb) {
    cb(null, crypto.randomUUID() + ".jpg");
  }
})
const upload = multer({storage: storage});

//router to be added.
app.post("/query", upload.single("ImagePrompt"), (req, res)=> {
  console.log(req.body);
  res.json({
    key: req.file.filename,
  })
  console.log(req.file.filename);
  res.status(200).end()
});

app.post("/text", (req, res)=> {
  console.log(req.body);
  res.status(200).end();
})

app.post("/deleteImage", (req, res)=> {
  fs.unlink(`./query/${req.body.delete}`, (err)=> {
    console.log(err);
  })
  res.status(200).end();
});


app.listen(PORT, ()=> {
  console.log(PORT);
})



