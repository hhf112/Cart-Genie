require("dotenv").config()
const cors = require("cors")
const express = require("express");
const multer = require("multer");

const routes = require("./routes/api_routes.js");


const PORT = process.env.PORT;
const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use(cors());


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



app.use("/", routes)

app.listen(PORT, () => {
  console.log(PORT);
})
