const {bigOak,defineRequestType,everywhere} = require("./crow-tech");
//bigOak.readStorage("food caches", caches => {
//let firstCache = caches[0];
//bigOak.readStorage(firstCache, info => {
//console.log(info);
//});
//});

//defineRequestType("note", (nest, content, source, done) => {
//console.log(`${nest.name} received note: ${content}`);
//done();
//});


function requestType(name, handler) {
    defineRequestType(name, (nest, content, source, callback) => {
    try {
        Promise.resolve(handler(nest, content, source))
        .then(response => callback(null, response),
        failure => callback(failure));
    } catch (exception) {
        callback(exception);
    }
    });
}

//bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7PM",
//() => console.log("Note delivered."));

//function storage(nest, name) {
//return new Promise(resolve => {
//nest.readStorage(name, result => resolve(result));
//});
//}
//
//storage(bigOak, "enemies")
//.then(value => console.log("Got", value));

class Timeout extends Error {}
function request(nest, target, type, content) {
    return new Promise((resolve, reject) => {
    let done = false;
    function attempt(n) {
        nest.send(target, type, content, (failed, value) => {
        done = true;
        if (failed) reject(failed);
        else resolve(value);
        });
    setTimeout(() => {
    if (done) return;
    else if (n < 3) attempt(n + 1);
    else reject(new Timeout("Timed out"));
        }, 250);
}
attempt(1);
});
}

//request(bigOak, "Cow Pasture","note", "Let's caw loudly at 7PM" )
//.then(value => console.log("note deleived"));


//everywhere(nest => {
//nest.state.gossip = [];
//});
//function sendGossip(nest, message, exceptFor = null) {
//nest.state.gossip.push(message);
//for (let neighbor of nest.neighbors) {
//if (neighbor == exceptFor) continue;
//request(nest, neighbor, "gossip", message);
//}
//}
//
//requestType("gossip", (nest, message, source) => {
//if (nest.state.gossip.includes(message)) return;
//console.log(`${nest.name} received gossip '${
//message}' from ${source}`);
//sendGossip(nest, message, source);
//});

everywhere(nest => {
nest.state.connections = new Map;
nest.state.connections.set(nest.name, nest.neighbors);
broadcastConnections(nest, nest.name);
});

requestType("connections", (nest, {name, neighbors},
source) => {
let connections = nest.state.connections;
if (JSON.stringify(connections.get(name)) ==
JSON.stringify(neighbors)) return;
connections.set(name, neighbors);
broadcastConnections(nest, name, source);
});
function broadcastConnections(nest, name, exceptFor = null) {
for (let neighbor of nest.neighbors) {
if (neighbor == exceptFor) continue;
request(nest, neighbor, "connections", {
name,
neighbors: nest.state.connections.get(name)
});
}
}

function findRoute(from, to, connections) {
let work = [{at: from, via: null}];
for (let i = 0; i < work.length; i++) {
let {at, via} = work[i];
for (let next of connections.get(at) || []) {
if (next == to) return via;
if (!work.some(w => w.at == next)) {
work.push({at: next, via: via || next});
}
}
}
return null;
}