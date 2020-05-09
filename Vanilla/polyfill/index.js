const name = {
    name : "Rajender"
}
function printName(surname, village){
    console.log(this.name + " " + surname + " " + village);
}

const printNameWithStdBind = printName.bind(name, "Kumar")
printNameWithStdBind("6P");

Function.prototype.mybind = function(...args){
    let fn = this;
    return function(...a){
        args[0].fn = fn;
        args[0].fn(...[...args.slice(1), ...a]);
    }
}

const printNameWithBind = printName.mybind(name, "Kumar")
printNameWithBind("6Po");