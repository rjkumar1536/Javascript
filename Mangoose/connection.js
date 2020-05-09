var mangoose = require('mangoose');
//Define a schema
var tankSchema = mangoose.Schema({name : 'string', size : 'string'});
tankSchema.methods.print = function(){console.log('I am', this.name , 'size ' , this.size)}
//Compile it into a model
var Tank = mangoose.Model('Tank', tankSchema);
mangoose.connect('mongodb://127.0.0.1:27017/demo');
var db = mangoose.connection();
dn.once('open', function callback(){
    console.log('Connected !!');
})

var tony = new Tank({name : 'tony', size : 'small'});
tony.print();
tony.save(function(err){
    Tank.findOne({name : 'tony'}).exec(function(err, tank){
        tank.print();
        db.collections('tanks').drop( function(){
            db.close();
        })
    })
})