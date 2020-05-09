const url = 'mongodb://localhost:27017'

const {MongoClient} = require("mongodb");

MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err, client)=>{
    if(err){
        console.error(err);
        return;
    }
    else{
        const db = client.db('documents');
        const collection = db.collection('persons');
        collection.find().toArray((error, items)=>{
            console.log(items);
        });       
    }
})