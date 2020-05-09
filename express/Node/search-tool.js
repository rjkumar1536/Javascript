const {readFileSync, readdirSync, statSync} = require("fs")
const {stat , readdir} = require("fs").promises;
const {resolve, sep} = require("path")
const {files} = require('node-dir')
const {parse} = require("url")

let arguments = process.argv
let regex,fileAnddir;
let collection = [];

if(arguments.length > 2){
    regex = new RegExp(arguments[2], "i")
}

var result = []
if(arguments.length > 3){
    fileAnddir = arguments.slice(3);
}


function fileProvider(fileAnddir){
        let stats;
        try{
            stats = statSync(fileAnddir);
        }
        catch(error){
             throw error;
        }
        if(stats.isDirectory()){
           for(let f of readdirSync(fileAnddir)){
               fileProvider(fileAnddir + '/' + f);
           }
        }
        else{
            if(regex.test(readFileSync(fileAnddir, "utf-8"))){
                console.log(fileAnddir);
            }
        }
}

for(let f of fileAnddir){
    fileProvider(f)
}
