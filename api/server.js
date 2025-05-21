const bodyParser = require("body-parser");
const express = require("express")
const app = express();
const PORT = 3000;

let stat = 1;
const multer = require("multer");
const stoarge = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./dummy/")
  },
  filename: function (req, file, cb) {
    cb(null, `${stat}`);
    ++stat;
  }
})

const upload = multer({storage: storage});
app.use(bodyParser.json());


app.post("/query", upload.single(), (req, res)=> {
  console.log("worked\n");

});


app.listen(PORT, ()=> {
  console.log(PORT);
})



