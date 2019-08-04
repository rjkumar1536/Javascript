# Javascript

There is only one value in JavaScript that is not equal to itself, and that is
NaN (“not a number”).
console.log(NaN == NaN)
// → false


when null or undefined
occurs on either side of the operator, it produces true only if both sides are one
of null or undefined.
console.log(null == undefined);
// → true
console.log(null == 0);
// → false


There’s an Object.assign function that copies all properties from one object
into another.

let objectA = {a: 1, b: 2};
Object.assign(objectA, {b: 3, c: 4});
console.log(objectA);
// → {a: 1, b: 3, c: 4}

We saw push and pop, which add and remove elements at the end of an array,
earlier in this chapter. The corresponding methods for adding and removing
things at the start of an array are called unshift and shift.
