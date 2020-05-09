const userModel = require('../Users/user.js');
const jwt = require('jsonwebtoken');
const signToken = (user)=>{
     const token =   jwt.sign({
            iss : "rajender",
            sub : user.id,
            iat : new Date().getTime(),
            exp : new Date().setDate(new Date().getDate() + 1)
        }, "12345678");
     return token;
}
module.exports = {
    signUp : async (req, res, next)=>{
        const {email, password} = req.value.body;
        const foundUser = await userModel.findOne({email : email});
        if(foundUser) {
           return res.status(403).send({error : "Email Alreday in Use"});
        }
        const newUser = new userModel({
            email : email,
            password : password
        })
        await newUser.save();
        const token = signToken(newUser);
        res.status(200).json({token : token});
        console.log('Sign Up called')
    },
    signIn : async(req, res, next)=>{
        console.log('Sign In called');
    },
    secret : async (req, res, next)=>{
        console.log('seceret called');
    }
}