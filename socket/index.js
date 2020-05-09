const express = require('express');
const app = express();
const socket = require('socket.io');

//scoket set up
const server = app.listen(3000, function(){
  console.log('app is listening on 3000');
});
var io = socket(server);
io.on('connection', function(socket){
  console.log('user connected' + socket.id);
})
app.use(express.static('public'));
