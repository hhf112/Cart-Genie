require("dotenv").config(); //load the .env file in the process.env object
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

app.use(express.json());

const refreshTokens = [];
// refresh tokens are used to recreate jwt tokens if they expire
//usually not stored like this but just for tutorial
//store in some sort of database that doesn't renew everytime we start the server



//logging out avoids the effect of the refresh token being stolen by invalidating the current refresh token used to log out
//it does so by removing it from the database which tracks the refresh tokens
app.delete("/logout", (req,res)=>{
    refreshTokens = refreshTokens.filter(token => token !== req.body.token); 
    //removes the current refresh token used to do the call
})




//verifying the refresh token and creating a new access token
app.post("/token", (req, res)=>{
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401); 
    //401 : unauthorized
    //check if refresh token was passed in the req
    if (!refreshTokens.includes(refreshToken)) return sendStatus(403); //checl if the refresh token is still valid


    //verify the token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err,user)=>{
        if (err) sendStatus(403);
        const accessToken = generateAccessToken({username :  user.username});
        res.json({accessToken : accessToken});

    })    
});



app.post("/login", (req,res)=>{
    //authentication with username and password

    const username = req.body.username;
    const user = {username : username} //object to be encoded

    //using the node terminal command and node crypto lib to create a random secret key
    //require("crypto").randomBytes(64).toString("hex")


    //signing the user info
    // const access = jwt.sign(user, process.env.JWT_TOKEN_SECRET);
    const access = generateAccessToken(user);

    //generate refresh token on every login
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);
    refreshTokens.push(refreshToken); //add the refresh token to a storage
    console.log(refreshTokens);

    res.json({accessToken : access, refreshToken: refreshToken});
    
} );




function generateAccessToken(user)
{
    return jwt.sign(user, process.env.JWT_TOKEN_SECRET, {expiresIn: "30s"})
    //generate a JWT token which expires after 20s
}



app.listen(5000,()=>console.log("running"));