
var allP = [];
for(let current = 0; current <  4 ;current++ ){
    let p = new Promise((resolve,reject) => {
        if( current == 5){
            reject("error at 200");
        }
        else{
            resolve(current);
        }
    })
    allP.push(p);
}

function promise_all(promises){
    var results = []
    var completedPromises = 1;
    return new Promise((resolve,reject) => {
        for ( let i = 0; i < allP.length ; i++){
            allP[i].then(value => {
                results.push(value);
                if(completedPromises == promises.length){
                    resolve(results);
                }
                completedPromises++;
            },
            error => {
                reject(error);
            }
            )
        }
    })
}


promise_all(allP)
    .then(result => {
        console.log(result);
    }, error => {
        console.log(error);
})