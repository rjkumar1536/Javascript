const router = require('express').Router();
 //auth login

 router.get('/login', (req,res)=>{
   res.render('login');
 })

//logout

router.get('/logout', (req,res)=>{
  //handle with passort
  res.send('logging out with gogle');
})
 //auth with google
 router.get('/google', (req,res)=>{
   //handle with passport
   res.send('logging in with gogle');
 });

 module.exports = router;
