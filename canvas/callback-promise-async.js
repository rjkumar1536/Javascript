//function execute(callback){
//    setTimeout(()=>{
//        console.log('hello');
//    },5000);
//    console.log('rrr');
//    callback();
//    console.log('rrr111');
//}
//
//function call(){
//    console.log('hello2');
//}
//execute(call)

function foo(i) {
    setTimeout(function () {
        console.log(i);
    }, i);
}

for (var i = 1; i <= 1000; i++) {
    foo(i);
}