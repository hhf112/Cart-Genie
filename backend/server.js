require("dotenv").config()
const cors = require("cors")
const express = require("express");
const multer = require("multer");

//routers
const imageServer = require("./routes/imageServer.js");


const PORT = process.env.PORT;
const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use(cors());


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



app.use("/", imageServer)

app.listen(PORT, () => {
  console.log(PORT);
})
