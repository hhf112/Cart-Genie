require("dotenv").config(); 
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

app.use(express.json());

// //app.get(<route>, ...<middleware>, <handler>)
// //use autheniticaateToken middleware to authenticate the token


function authenticateToken(req,res,next)
{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]

    if (token == null) return res.json({
        user: false,
        status: "valid",
    });
    //401: unauthroized client error
    //token not sent meaning no access

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user)=>{
        if (err) return res.json({
                    user: false,
                    status: "invalid",
                });
        //403 : sender recieved a req but refused to process it
        //token found but wrong token so no access
        
        //valid token
        req.user = user
    }); 
    next(); //end middleware functionality
}

app.listen(3000,()=>console.log("running properly"));
