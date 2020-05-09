counter = 0;
const getData = ()=>{
    console.log(`Fecthing data ${counter}`);
    counter ++;
}

const doSomeMagic = function(fn, delay){
    let context = this;
    let arg = arguments;
    let timer;
    return function(){
        clearTimeout(timer);
      timer =   setTimeout(fn.bind(context), delay);
    }
}
const debouncing = doSomeMagic(getData, 400);