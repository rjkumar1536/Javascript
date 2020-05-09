//var express = require('express');
//var bodyPaser = require('body-parser');
////var serveIndex = require('serve-index');
////express().use(express.static(__dirname)).use(serveIndex(__dirname)).listen(3000);
//
////express().use(bodyPaser()).use(function(req, res, next){
////    if(req.body.foo){
////        res.end('value of foo is ' + '=' + req.body.foo);
////    }
////    else{
////        res.end('body does not contain foo attribute');
////    }
////}).use(function(err, req, res, next){
////    res.end('Invalid Json');
////}).listen(3000);
//
////express().use(function(req,res){
////    console.log(req.headers['cookie'])
////    res.cookie('name', 'rajender');
////    res.end('Hello');
////}).listen(3000)
//
//var cookieParser = require('cookie-parser');
////express().use(cookieParser()).use(function(req, res, next){
////    if(req.cookies.name)    {
////        console.log(req.cookies.name)
////    }
////    else{
////        res.cookie('name', 'foo');
////    }
////    res.end("hello !!!");
////}).listen(3000)
//
////express().use(cookieParser('my secret key')).use('/toggle', function(req, res){
////    if(req.signedCookies.name){
////        res.clearCookie('name');
////        res.end('hello clerared');
////    }
////    else{
////        res.cookie('name', 'gori', {signed : true});
////        res.end('hello set');
////    }
////}).listen(3000)
//var cookieSession = require('cookie-session');
//express().use(cookieSession({keys : ['my key']})).use('/home',function(req, res, next){
//    if(req.session.views){
//        req.session.views++;
//    }
//    else{
//        req.session.views = 1;
//    }
//    res.end('total views for you ' + req.session.views);
//}).use('/reset', function(req, res, next){
//    delete req.session.views;
//    res.end(0);
//}).listen(3000)

//var express = require('express');
//var app = express();
//app.param('userId', function (req, res, next, userId) {
//res.write('Looking up user: ' + userId + '\n');
//// simulate a user lookup and
//// load it into the request object for later middleware
//req.user = { userId: userId };
//next();
//});
//app.get('/user/:userIdi ', function (req, res) {
//res.end('user is: ' + JSON.stringify(req.user));
//});
//app.listen(3000);

