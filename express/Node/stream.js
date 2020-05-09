const {createServer} = require("http");
createServer((request, response)=>{
    response.writeHead(200, {"Content-Type" : "text/html"});
    request.on("data", chunk => {
        response.write('<html>' + chunk.toString().toUpperCase() + '</html>');
    })
    request.on("end", ()=> response.end());
}).listen(8000);

