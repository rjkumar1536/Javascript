let {readFile,writeFile} = require("fs");
let arg = process.argv[2];
readFile(arg, "utf-8" , (error , text) => {
    if(error){
        throw error;
    }
    console.log(text);
});
writeFile("newFIle" ,"new file", (error) =>{
    if(error){
        console.log(error)
    }
    console.log("file written");
})
//console.log(reverse(arg));