const express = require('express');
const app = express();
const session = require('express-session');
const cookie = require('cookie-parser');
app.use(cookie())
const genuuid = ()=>{
    var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < 32; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
app.use(session({
    name : "rajender",
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge : 1000*60*60,
        sameSite : true,
        secure : true,
    }
    // genid: (req)=>{
    //     const id = genuuid();
    //     console.log(id)
    //     return id;
    // }
}))
app.get('/', (req, res)=>{
    console.log(req.session.views, req.sessionID);
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
      } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
      }
})
app.use(express.urlencoded({extended : true}));

app.listen(3000, ()=>{
    console.log("listenning at port");
})