const {request} = require("http")
let color = process.argv[2];
request({
    hostname : "localhost",
    port : 8000,
    method : "POST"
},response=>{
    response.on("data" , chunk=>{
        process.stdout.write(chunk);
    })
}).end(color);