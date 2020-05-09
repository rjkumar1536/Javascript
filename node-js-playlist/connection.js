const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser : true, useUnifiedTopology : true});
mongoose.connection.once('open', ()=>{
  console.log('connectionb establihsed');
})
const schema = new mongoose.Schema({
  item : String
});


const model = mongoose.model('lists', schema);
module.exports = model;
