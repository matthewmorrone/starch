Function.prototype.define("repeat", function(n) {
	n = n || 2
	var m = 0,
		p = "",
		r = ""
	while (m < n) {
		p = 0
		p = "" + this.call()
		if (p) {
			r += p
		}
		m++
	}
	return "" + r
})
Function.prototype.define("proxy", function() {
	this.apply(context, arguments.slice(1))
})
Function.prototype.define("iter", function() {
	var internal = 0
	return function() {
		internal++
		return internal.base(26)
	}
})