const express = require('express');
const session = require('express-session');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.get('/', (req, res)=>{
    res.cookie('username', 'password')
    res.send();
})
// app.use(session({
//     name : 'sid',
//     resave : false,
//     saveUninitialized : false,
//     secret : "rajender",
//     cookie : {
//         maxAge : 1000*60,
//         sameSite : true,
//         secure : true
//     }
// }))
// const posts = [
//     {
//         username : 'Kyle',
//         title : 'Post 1'
//     },
//     {
//         username : 'rajender',
//         title : 'Post 2'
//     }
// ]
// const auntheticate = (req, res , next)=>{
//     const authHeader = req.headers['authorization'];
//     console.log(req.headers);
//     console.log(authHeader);
//     const token = authHeader && authHeader.split(' ')[1];
//     if(token == null) return res.sendStatus(401);
//     jwt.verify(token , process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
//         if(err){
//             res.sendStatus(403);
//         }
//         else{
//             req.user = user.username;
//         }
//     }); 
//     next();
// }

// app.get('/posts', auntheticate, (req, res)=>{
//     console.log(req.user);
//     res.json(posts.filter((post)=>{
//         return post.username == req.user;
//     }));
// });



app.listen(3000);