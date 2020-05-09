// const expensiveFunc = (a)=>{
//     console.log("resizing" + a);
// }
// function  throttle(fn, delay){
//     let context = this;
//     let arg = arguments;
//     let flag = true;
//     return function(){
//         console.log(this, arguments);
//         if(flag){
//             fn.apply(context);
//             flag = false;
//         }
//         else{
//             setTimeout(()=>{
//                 flag = true;
//             }, delay)
//         }
//     }
// }
// const throttledExpensiveFunc  = throttle(()=>{
//     expensiveFunc('Jai Hind');
// }, 400);


// window.addEventListener("resize", throttledExpensiveFunc)

// let multiply = function(x,y){
//     console.log(this);
//     console.log(x*y);
// }

// let multiplyByTwo = function () {
//     multiply.bind(this, 2);
// }
// console.log(multiplyByTwo)
// multiplyByTwo(3);


// const multiply = function(x){
//     return function(y){
//         return x * y;
//     }
// }

// const multiplyByTwo = multiply(2);
// console.log(multiplyByTwo);
// console.log(multiplyByTwo(3));

 function sum(a){
    return function(b){
        if(b)
        return sum(a+b);
        else
        return a;
    }
};

console.log(sum(1)(2)(3)(4)(5)());


