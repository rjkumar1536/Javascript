const mod_a = require('./moduleA.js')
var toUpperCase = (str) => {
    return str.toUpperCase(mod_a.toLowerCase(str));
}
module.exports = {
    toUpperCase
}