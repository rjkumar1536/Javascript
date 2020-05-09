const {createServer} = require("http");
const methods = Object.create(null);

createServer((request, response) => {
    let handler = methods[request.method] ||notAllowed;
    handler(request).catch(error => {
        if(error.status != null ) return error;
        return {body : String(error) , status : 500}
    }).then(({body , status = 200, type = "text/plain"}) => {
        response.writeHead(status , {"Content-Type" : type});
        if(body && body.pipe ) body.pipe(response);
        else response.end(body);
    })
}).listen(8000);

async function notAllowed(request){
    return {
        status : 405,
        body : `Method ${request.method} not allowed`
    }
}

const {parse} = require("url");
const {resolve, sep} = require("path")
const baseDirectory = process.cwd();
//console.log(baseDirectory);

function urlPath(url){
//    console.log(url)
//    let {pathName} = parse(url);
    console.log(baseDirectory + sep + url.slice(1))
    let path = resolve(decodeURIComponent(baseDirectory + sep + url.slice(1)))
    console.log(path);
    if(path != baseDirectory && !path.startsWith(baseDirectory + sep)){
        throw {status : 403 , body : "Forbidden"}
    }
    return path;
}

const {createReadStream} = require("fs");
const {stat , readdir} = require("fs").promises;
const mime = require("mime");

methods.GET = async function(request){
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    }
    catch(error){
        if(error.code != "ENOENT") throw error;
        else return {status : 404 , body : "File Not Found"};
    }
    if(stats.isDirectory()){
        return { body : (await readdir(path).join("\n"))}
    }
    else{
        return {body : createReadStream(path),
                type : mime.getType(path)
               }
    }
    
}
const { rmdir , unlink,mkdir} = require("fs").promises;
methods.DELETE = async function(request) {
    let path =urlPath(request.url);
    let stats ;
    try{
        stats = await stat(path);
    }
    catch(error){
        if(error.code != "ENOENT"){
            throw error;
        }
        else{
            return { status : 204}
        }
    }
    if(stats.isDirectory()){
        await rmdir(path);
    }
    else{
        await unlink(path);
    }
    return {status : 204};
}

const {createWriteStream,existsSync} = require("fs");
function pipeStream(from ,to){
    return new Promise((resolve , reject) => {
        from.on("error" ,reject);
        to.on("error" ,reject);
        to.on('finish', resolve);
        from.pipe(to);
    })
}

methods.PUT = async function(request){
    let path = urlPath(request.url);
    await pipeStream(request, createWriteStream(path));
    return {status : 204};
}

methods.MKCOL = async function(request){
//    console.log(request)
    let path = urlPath(request.url);
    if(existsSync(path)){
        await rmdir(path);
    }
//    else{
       await mkdir(path);
//    }
    return {status : 204}
}