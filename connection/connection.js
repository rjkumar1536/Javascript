const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/NewDb');

mongoose.connection.once('open', ()=>{
    console.log('connection established');
}).on('error', ()=>{
    console.log(error);
})


// const schema = new mongoose.Schema({
//     name : String,
//     age : Number
// });

// const model = mongoose.model('collection', schema);

// let record = new model();
// record.name = 'rajender';
// record.age = 25

// record.save().then((err, obj)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(obj);
//     }
// })

// model.find({}, (err, obj)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(obj);
//     }
// })

// model.findOne({name : 'rajender'}, (err, obj)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         if(obj != null){
//             obj.name = 'gorishanker';
//             obj.save();
//         }
//     }
// })

// model.findOneAndRemove({name : 'gorishanker'}, (err, obj)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//        console.log('removed');
//     }
// })

// model.findOneAndUpdate({name : 'rajender'}, {$inc : {age : 1}}, (err, obj)=>{
//     console.log('done');
// })



const BookSchema = new mongoose.Schema({
    title : String,
    pages : Number
});

const AuthorSchema = new mongoose.Schema({
    name : String,
    age : Number,
    books :[BookSchema]
});

const Author = mongoose.model('Author', AuthorSchema);

let author = new Author({
    name : 'Rajender',
    age : 25,
    books : [{
        title : 'Once Upon a time',
        pages : 27
    }]
});
author.save().then((err, obj)=>{
    console.log(obj);
})