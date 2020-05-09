const {request} = require("http");
request({
    hostname : "localhost",
    port : 8000,
    method : "POST",
    body  : "ertertrettrert"
}, response => {
    response.on("data", chunk => {
        process.stdout.write(chunk.toString());
    })
}).end("<h1></h1>");