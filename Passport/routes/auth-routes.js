const router = require('express').Router();
const passport = require('passport');
 //auth login

 router.get('/login', (req,res)=>{
   res.render('login', {user : req.user});
 })

//logout

router.get('/logout', (req,res)=>{
  //handle with passort
  req.logout();
  res.redirect('/');

})
//auth with google
router.get('/google', passport.authenticate('google',{
  scope : ['profile']
}));
//callback redirect
router.get('/google/redirect', passport.authenticate('google'),(req,res)=>{
  //handle with passort
  // res.send(req.user);
  // var string = encodeURIComponent(req);
  res.redirect('/profile/');
})


 module.exports = router;
