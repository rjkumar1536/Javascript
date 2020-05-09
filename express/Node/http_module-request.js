let request = require("request")
//let requestStream = request({
//    hostname : "http://127.0.0.1",
//    method : "GET",
//    headers : {Accept : "text/html"}
//}, (error , response, body) => {
//    console.log(response.statusCode);
//    console.log(body);
//});
let requestStream = request("http://127.0.0.1:8000/hellojksfkjsfajskdbfjsdbs" ,(error,response,body) => {
//    console.log(response.statusCode);
//    console.log(error.statusCode);
    console.log(body)
});
requestStream.end();