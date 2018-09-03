Number.prototype.define('isOdd', function isOdd(obj) {
	return (obj % 2 === 1 || obj % 2 === -1)
})
Number.prototype.define('isEven', function isEven(obj) {
	return obj % 2 === 0
})
Number.prototype.define('isInteger', function isInteger(obj) {
	return obj % 1 === 0
})
Number.prototype.define('isFloat', function isFloat(obj) {
	return obj % 1 !== 0
})
Number.prototype.define('isPositive', function isPositive(obj) {
	return obj > 0
})
Number.prototype.define('isNegative', function isNegative(obj) {
	return obj < 0
})
Number.prototype.define("isMultipleOf", function isMultipleOf(multiple) {
	return this % multiple === 0
})
Number.prototype.define("isLuhn", function isLuhn(num) {
	num = (num + '').split('').reverse()
	var sum = 0,
		i, digit
	for (i = 0; i < num.length; i++) {
		digit = parseInt(num[i], 10) * ((i + 1) % 2 ? 1 : 2)
		sum += digit > 9 ? digit - 9 : digit
	}
	return (sum % 10) === 0
})
Number.prototype.define("base", function(b, c) {
	var s = "",
		n = this
	if (b > (c = (c || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").split("")).length || b < 2) {
		return ""
	}
	while (n) {
		s = c[n % b] + s, n = Math.floor(n / b)
	}
	return s
})
Number.prototype.define("abs", function() {
	return Math.abs(this)
})
Number.prototype.base26 = (function() {
	return function base26() {
		n = this
		ret = ""
		while (parseInt(n) > 0) {
			--n
			ret += String.fromCharCode("A".charCodeAt(0) + (n % 26))
			n /= 26
		}
		return ret.split("").reverse().join("")
	}
}())