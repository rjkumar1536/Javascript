// const events = require('events');
// const util = require('util');
// const fs = require('fs');
// const http = require('http');
// const ejs = require('ejs');
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }))
// app.set('view engine', 'ejs');
// app.use('/styles', express.static('styles'));
// app.get('/',(req, res)=>{
//   // res.sendFile(__dirname + '/index.html');
//   // console.log(req.query);
//   res.render('index', {qs : req.query});
// });
//
// app.post('/action',(req,res)=>{
//   console.log(req.body);
//   res.render('home-success', {data : req.body})
// })
// app.get('/profile/:name', function(req,res){
//   // res.send(  req.params.name + ' called');
//   // res.sendFile(__dirname + '/contact.html');
//   res.render('profile', {user : req.params.name , data : {age : 20 , hobbies : ["eating", "bathing", "playing"] }})
// });
// app.listen(8000, ()=>{
//   console.log('running at port 8000');
// });

// const myreadstream = fs.createReadStream(__dirname + '/readme.txt', 'utf8');
// const mywritestream = fs.createWriteStream(__dirname + '/writeme.txt', 'utf8');
// myreadstream.pipe(mywritestream);
// myreadstream.on('data', function(chunk){
//   mywritestream.write(chunk);
// })
// http.createServer(function(req, res){
//   console.log(req);
//   res.writeHead(200, {'Content-Type' : 'text/html'});
//   if(req.url == '/home' || req.url == '/'){
//     const readStream = fs.createReadStream(__dirname  + '/index.html', 'utf8');
//       readStream.pipe(res);
//   }
//   else if(req.url === '/contact'){
//       const readStream = fs.createReadStream(__dirname  + '/contact.html', 'utf8');
//         readStream.pipe(res);
//   }

  // res.writeHead(200, {'Content-Type': 'application/json'});
  // let obj = Object.assign({},{name : 'rajender', salary : '1000000000'});
  // res.end(JSON.stringify(obj));
  // const myreadstream = fs.createReadStream(__dirname + '/index.html', 'utf8');
  // myreadstream.pipe(res);
  // myreadstream.on('data', function(chunk){
  //   res.write(chunk);
  // res.end('ff');
  // })
// }).listen(3000);

// let read = fs.readFileSync('readme.txt', 'utf8');
// fs.readFile('readme.txt', 'utf8', function(error, data){
//   // console.log(data);
//   fs.writeFile('writeme.txt', data, function(){
//     console.log('file saved');
//     fs.unlink('writeme.txt', function(){
//       console.log('file deleted');
//     });
//   });
// });



// console.log(read);

// let write = fs.writeFileSync('writeme.txt', read);
//
// const myEvevntEmitter = new events.EventEmitter();
//
// myEvevntEmitter.on('some', (msg)=>{
//   console.log(msg);
// })
//
// myEvevntEmitter.emit('some', 'event fired');
// var Person = function(name){
//   this.name = name;
// }
// util.inherits(Person, events.EventEmitter);
// var people = [];
// for(let i = 0; i < 4; i++){
//   people.push(new Person(`foo ${i} bar ${i}`));
//   people[i].on('speak', (msg)=>{
//     console.log(`${ people[i].name } spoke ${msg}`);
//   })
// }
// for(let i = 0; i < 4; i++){
//   people[i].emit('speak','i am good');
// }
const model = require('./connection');
const express = require('express');
const bodyParser = require('body-parser');
const async = require('async');
const app = express();
const cors = require('cors');
const jsonParser   = bodyParser.json()
app.use(cors())
app.get('/api/items', (req, res)=>{
  model.find({}, (error, data)=>{
    let collection = [];
    // console.log(data);
    for(let record of data){
      collection.push({id : record.id, item : record.item, noneditable : true,dirty : false});
    }
    res.set({'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization'
    });
    res.json(collection);
  })
});

app.post('/api/edit', jsonParser, (req, res)=>{
  const id = req.body.data;
  model.find({"_id" : id}, (error, data)=>{
    res.set({'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization'
    });
    console.log(data);
    res.json({id : data[0].id, item : data[0].item, noneditable: true, dirty : false});
  })
});


app.post('/api/items',jsonParser, (req, res)=>{
  let record = new model();
  record.item = req.body.data;
  record.save().then((data)=>{
      res.set({'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization'
      });
      res.json({id : data.id, item : data.item, noneditable : true, dirty : false });
  })
});

app.delete('/api/items', jsonParser, (req, res)=>{
  model.findOneAndRemove({'_id' : req.body.id}, (error, data)=>{
    // if(!error && data != null){
    // console.log(data);
        res.set({'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization'
        });
        res.json({id : req.body.id});
    // }
  })
});

app.put('/api/items', jsonParser, (req, res)=>{
  // model.
  res.set({'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization'
  });
  const records = req.body.data;
  // console.log(records);
  let ids = [];
  async.eachSeries(records, function updateObject (obj, done) {
    model.update({ "_id": obj.id }, { $set : {"item" : obj.item }}, done);
    ids.push(obj.id);
    }, function allDone (err) {
      res.json({id : ids});
  });
});

app.post('/api/cancel', jsonParser, (req, res)=>{
  // model.
  res.set({'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization'
  });
  const ids = req.body.data;
  let records = [];
  async function execute(){
    let promise_a = new Promise((resolve , reject)=>{
      let count = 0;
      for(let id of ids){
        model.find({"_id" : id}, (error, data)=>{
          count++;
          records.push({id : data[0].id, item : data[0].item, noneditable: true, dirty : false});
          if(count == ids.length)
          resolve(1);
        });
      }
    });
    await promise_a;
    res.json({data : records});
  }
  execute();
});
app.listen(5000);
