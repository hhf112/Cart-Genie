const bodyParser = require("body-parser");
const express = require("express")
const app = express();
const PORT = 3000;

app.use(bodyParser.json());


app.post("/prompt", (req, res)=> {

});


app.listen(PORT, ()=> {
  console.log(PORT);
})



