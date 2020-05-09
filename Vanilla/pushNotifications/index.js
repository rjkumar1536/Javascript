const express = require('express');
const webPush = require('web-push')
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
//set static path
app.use(express.static(path.join(__dirname , 'client')));
const publicValidKey = 'BPZR6FMp_VIo0nsudQ-B_F9V759wbDYsVMk_lqzpofSiRH2fON-udB3-cUQDBWtfWfh0mScjLQL4akwolSYobuM';
const privateVapidKey = 'MAkfgQUwoEIgZAe7XKdeSE7QCBM3e7G1eZn0KEi1Tpg';
app.use(bodyParser.json());
webPush.setVapidDetails('mailto:test@test.com', publicValidKey, privateVapidKey);
app.post('/subscribe', (req, res)=>{
    //get pushNotification object
    const subscription = req.body;
    res.status(201).json({});

    //create payload
    const payload = JSON.stringify({'title' : 'Push Test'});
    webPush.sendNotification(subscription, payload).catch(err=>console.error(err));
})

app.get('/', (req,res)=>{
    console.log('hello');
    res.json({});
})
app.listen(5000, ()=>{
    console.log('server started on port 5000');
})