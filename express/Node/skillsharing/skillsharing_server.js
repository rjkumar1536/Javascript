var {createServer} = require("http");
var Router = require("./router");
var ecstatic = require("ecstatic");
const {MongoClient} = require("mongodb");

var router = new Router();
var defaultHeaders = {"Content-Type": "text/plain"};
const url = 'mongodb://localhost:27017'
const myDb = 'skillshare'
const myCollection = 'talks'
var talks = []
function getTalks(url , myDb , myCollection){
      MongoClient.connect(url ,{
            useNewUrlParser: true,
            useUnifiedTopology: true
      },(error, client)=>{
          const db = client.db(myDb);
          const collection = db.collection(myCollection);
          collection.find().toArray((err, items)=>{
              talks = items;
          })
      })
}

function deleteTalk(title){
    MongoClient.connect(url ,{
            useNewUrlParser: true,
            useUnifiedTopology: true
      },(error, client)=>{
          const db = client.db(myDb);
          const collection = db.collection(myCollection);
          collection.remove({title : title});
      })
}

function deleteComments(title, comments){
    MongoClient.connect(url,{
        useNewUrlParser : true,
        useUnifiedTopology: true
    },(error, client)=>{
        const db = client.db(myDb);
        const collection = db.collection(myCollection);
        collection.update({title : title}, {$set : {comment : comments}});
    })
}

function putTalk(talk){
    MongoClient.connect(url ,{
            useNewUrlParser: true,
            useUnifiedTopology: true
      },(error, client)=>{
          const db = client.db(myDb);
          const collection = db.collection(myCollection);
          collection.insert(talk);
      })
}
function postComment(myTitle, myComments){
    MongoClient.connect(url ,{
            useNewUrlParser: true,
            useUnifiedTopology: true
      },(error, client)=>{
          const db = client.db(myDb);
          const collection = db.collection(myCollection);
          collection.updateOne({title : myTitle}, {$set : {comments:myComments}});
        
      })
}



var SkillShareServer = class SkillShareServer {
  constructor() {
    this.talks = talks
    this.version = 0;
    this.waiting = [];
    let fileServer = ecstatic({root: "./public"});
    this.server = createServer((request, response) => {
      let resolved = router.resolve(this, request);
      if (resolved) {
        resolved.catch(error => {
          if (error.status != null) return error;
          return {body: String(error), status: 500};
        }).then(({body,
                  status = 200,
                  headers = defaultHeaders}) => {
          response.writeHead(status, headers);
          response.end(body);
        });
      } else {
        fileServer(request, response);
      }
    });
  }
  start(port) {
    this.server.listen(port);
  }
  stop() {
    this.server.close();
  }
}

const talkPath = /^\/talks\/([^\/]+)$/;

router.add("GET", talkPath, async (server, title) => {
 let result = server.talks.filter((talk)=>{
      return talk.title == title;
  })
  if (result) {
    return {body: JSON.stringify(result),
            headers: {"Content-Type": "application/json"}};
  } else {
    return {status: 404, body: `No talk '${title}' found`};
  }
});

router.add("DELETE", talkPath, async (server, title) => {
  let result = server.talks.filter((talk)=>{
      return talk.title == title;
  })
  if (result) {
    delete server.talks[server.talks.indexOf(result[0])]
    deleteTalk(title);
    server.updated();
  }
  return {status: 204};
});

function readStream(stream) {
  return new Promise((resolve, reject) => {
    let data = "";
    stream.on("error", reject);
    stream.on("data", chunk => data += chunk.toString());
    stream.on("end", () => resolve(data));
  });
}

router.add("PUT", talkPath,
           async (server, title, request) => {
  let requestBody = await readStream(request);
  let talk;
  try { talk = JSON.parse(requestBody); }
  catch (_) { return {status: 400, body: "Invalid JSON"}; }

  if (!talk ||
      typeof talk.presenter != "string" ||
      typeof talk.summary != "string") {
    return {status: 400, body: "Bad talk data"};
  }
  server.talks.push({title,
                         presenter: talk.presenter,
                         summary: talk.summary,
                         comments: []});
  
  putTalk({title,presenter: talk.presenter,
                         summary: talk.summary,
                         comments: []});
  server.updated();
  return {status: 204};
});

let commentPath = /^\/talks\/([^\/]+)\/comments$/;
router.add("POST", commentPath,
           async (server, title, request) => {
  let requestBody = await readStream(request);
  let comment;
  try { comment = JSON.parse(requestBody); }
  catch (_) { return {status: 400, body: "Invalid JSON"}; }
//  console.log(server.talks, comment, title);
    let result = server.talks.filter((talk)=>{
      return talk.title == title;
  })
    console.log(result)
  if (!comment ||
      typeof comment.author != "string" ||
      typeof comment.message != "string") {
    return {status: 400, body: "Bad comment data"};
  } else if (result) {  
            result[0].comments.push(comment);
            postComment(title,result[0].comments);
            server.updated();
            return {status: 204};
    
  } else {
    return {status: 404, body: `No talk '${title}' found`};
  }
});

router.add("DELETE",commentPath , async (server, title, request)=>{
    let requestBody = await readStream(request);
    let commentAll;
    try{
        commentAll = JSON.parse(requestBody).comment;
    }
    catch(_){return {status :400, body : "Invalid Json"}}
    let result = server.talks.filter((talk)=>{
        return talk.title == title;
    })
    if(!commentAll){
        return {status : 400, body : "bad comment data"}
    }
    else if(result){
        result[0].comments = result[0].comments.filter((comment)=>{
            var is = commentAll.some((c)=> c.author == comment.author && c.message == comment.message)
            if(!is){
                return comment;
            }
        })
        deleteComments(title,result[0].comments);
        server.updated();
        return {status: 204};
    }
    else{
        return {status : 404, body : `No Talk '${title}' found`}
    }
} )

SkillShareServer.prototype.talkResponse = function() {
  let talks = [];
  for (let title of Object.keys(this.talks)) {
    talks.push(this.talks[title]);
  }
  return {
    body: JSON.stringify(talks),
    headers: {"Content-Type": "application/json",
              "ETag": `"${this.version}"`}
  };
};

router.add("GET", /^\/talks$/, async (server, request) => {
  let tag = /"(.*)"/.exec(request.headers["if-none-match"]);
  let wait = /\bwait=(\d+)/.exec(request.headers["prefer"]);
  if (!tag || tag[1] != server.version) {
    return server.talkResponse();
  } else if (!wait) {
    return {status: 304};
  } else {
    return server.waitForChanges(Number(wait[1]));
  }
});

SkillShareServer.prototype.waitForChanges = function(time) {
  return new Promise(resolve => {
    this.waiting.push(resolve);
    setTimeout(() => {
      if (!this.waiting.includes(resolve)) return;
      this.waiting = this.waiting.filter(r => r != resolve);
      resolve({status: 304});
    }, time * 1000);
  });
};

SkillShareServer.prototype.updated = function() {
  this.version++;
  let response = this.talkResponse();
  this.waiting.forEach(resolve => resolve(response));
  this.waiting = [];
};
setTimeout(()=>{
    new SkillShareServer(Object.create(null)).start(8000);
},2000)
getTalks(url , myDb , myCollection);
