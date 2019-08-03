var Calc = function (argument) {
	// body... 
	this.add = function (x) {
		/* body... */
		argument = argument + x;
		return this;
	}
	this.multiply = function (x) {
		argument = argument * x;
		/* body... */
		return this;
	}
	this.equals = function (callback) {
		/* body... */
		callback(this)
		return this;
	}
}
var x = new Calc(0).add(1);