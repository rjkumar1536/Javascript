const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
// app.use(bodyParser);
const routes = require('./Routes/route.js');
const logger = (req, res, next)=>{
    console.log(req);
    next();
}
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ApiAunthetication');
app.use(express.json());
app.use(express.urlencoded());
app.use(logger);
const port = process.env.PORT || 5000;
app.use('/users', routes);
app.listen(port , ()=>{
    console.log('server listenning on port ' + port);
})

