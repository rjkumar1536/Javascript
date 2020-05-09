const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../Models/user-model.js');

passport.serializeUser((user, done)=>{
  done(null,user.id);
});

passport.deserializeUser((id, done)=>{
  User.findById(id).then((user)=>{
    done(null,user);
  });
})
 passport.use(new GoogleStrategy({
   //options for strategy
   callbackURL : "/auth/google/redirect",
   clientID : keys.google.clientID,
   clientSecret : keys.google.clientSecret
 }, (accessToken , refreshToken, profile, done)=>{
   //passport callback
   console.log(profile);
   User.findOne({googleID : profile.id}, (err, obj)=>{
     if(err){
       console.log(error);
     }
     else{
       if(obj == null){
         new User({
           userName :  profile.displayName,
           googleID :  profile.id
           // thumbnail : profile._json.picture
         }).save().then(newUser=>{
           // console.log(newUser);
         });
         done(null,obj);
       }
       else{
         console.log('User Alreday Exists');
         done(null,obj)
       }
     }
   })

 }));
