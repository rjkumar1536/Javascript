const {createServer} = require("http")
const {unlink,writeFileSync} = require("fs")
createServer((request, response)=>{
    response.writeHead(200 , {"Content-Type" : "text/html"});
    request.on("data", chunk=>{
//        response.write(chunk.toString().toUpperCase())
          writeFileSync("index.html", `<html><body><script> document.body.style.backgroundColor = "${chunk.toString()}"; setInterval(()=>{
                window.location.reload(true);
            },2000); </script></body></html>`);
    })
    request.on("end", ()=>{
        response.end()
    })
}).listen(8000);