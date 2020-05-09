const router = require('express').Router();

const authCheck = (req, res, next)=>{
  console.log(req.user)
  if(req.user){
    next();
  }
  else{
    res.redirect('/auth/login');
  }
}
router.get('/', authCheck, (req,res)=>{
  // var passedVariable = req.query.valid;
  // res.send('U r logged in -'+ req.user.userName);
  res.render('profile', {user : req.user});
})

module.exports = router;
