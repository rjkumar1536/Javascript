const mod_b = require('./ModuleB.js')
var toLowerCase = (str) =>{
    return str.toLowerCase(mod_b.toUpperCase(str));
}
module.exports = {
    toLowerCase
}