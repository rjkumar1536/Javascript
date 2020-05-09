const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(express.json());
const generateAccessToken = (payload)=>{
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '15s'})
}
app.post('/token', (req, res)=>{
    const refreshToken = req.body.token;
    if(rToken.contains(refreshToken)){
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload)=>{
            if(err){
                res.sendStatus(403);
            }
            else{
                const accessToken = generateAccessToken({username : payload.username});
                res.send()
            }
        })
    }
    else{
        res.sendStatus(403);
    }

})
let rToken = []
app.post('/login',  (req,res)=>{
    // console.log(req.);
     const username = req.body.username;
     let user = {
         username
     }
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    rToken.push(refreshToken);
    //  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
     res.json({accessToken, refreshToken}); 
})


app.listen(4000);