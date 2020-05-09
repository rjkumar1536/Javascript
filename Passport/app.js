const express = require('express');
const appRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require("./config/passport-auth");
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const app = express();
const cookieSession = require('cookie-session');
app.set('view engine','ejs');
app.get('/',(req,res)=>{
  res.render('home', {user : req.user});
});
app.use(cookieSession({
  maxAge : 24*60*60*1000,
  keys : [keys.secretKey]
}))

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(keys.dbURI, ()=>{
  console.log('connected to mongodb');
});
mongoose.connection.once('open', ()=>{
    console.log('connection established');
}).on('error', (error)=>{
    console.log(error);
});
 //set up routes
 app.use('/auth',appRoutes);
 app.use('/profile',profileRoutes);
app.listen(3000, ()=>{
  console.log('express app started');
});
