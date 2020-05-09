const express = require('express');
const appRoutes = require('./routes/auth-routes');
const app = express();
app.set('view engine','ejs');
app.get('/',(req,res)=>{
  res.render('home');
});
 //set up routes
 app.use('/auth',appRoutes);
app.listen(3000, ()=>{
  console.log('express app started');
});
