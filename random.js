Object.prototype.define("pick", function() {
	var keys = Object.keys();
	return this[keys[Math.floor((Math.random() * keys.length))]];
})

function randomNumber(min, max, round) {
	result = (Math.random() * max) + min
	result *= Math.pow(10, round)
	result = Math.round(result)
	result /= Math.pow(10, round)
	return result
}


var Random = function Random() {}
var nativeRandom = Math.random;



var nativeRandom = Math.random
Math.random = function(min, max, round, mt) {
	if (arguments.length === 0) {
		return nativeRandom()
	}
	if (!round) {
		round = 1
	}
	if (!max) {
		var max = min
		min = 1
	}
	if (mt) {
		min = parseInt(min, 10)
		max = parseInt(max, 10)
	}
	return Math.floor(nativeRandom() * (max - min + 1)) + min
}
Math.random.range = function(min, max) {
	'use strict';

	min = parseFloat(min) || 0;
	max = parseFloat(max) || 0;

	return Math.floor(Math.random() * (max - min + 1)) + min
}



Random.prototype.define("boolean", function() {
	return Math.random() >= 0.5;
})
Random.prototype.define("min", function() {
	return 0;
})
Random.prototype.define("max", function() {
	return 2147483647;
})
Random.prototype.define("between", function(low, high, digits) {
	var d = (typeof digits === 'number' && digits > 0 ? digits : 0),
		floor = +low,
		range = +(high - low),
		random = Math.random() * range + floor;
	return random.toFixed(d);
})
Random.prototype.define("within", function(range) {
	return Math.floor(range[0] + Math.random() * (range[1] + 1 - range[0]));
})
Random.prototype.define("normal", function(mean, stdDev) {
	var u, v, s;
	mean = mean || 0;
	stdDev = stdDev || 1;
	do {
		u = Math.random() * 2 - 1;
		v = Math.random() * 2 - 1;
		s = u * u + v * v;
	} while (s >= 1 || s === 0);
	return mean + stdDev * u * Math.sqrt(-2 * Math.log(s) / s);
})
Random.prototype.define("bool", function() {
	return Math.random() >= 0.5;
})
Random.prototype.define("boolean", function() {
	return Math.random() >= 0.5;
})
Random.prototype.define("bit", function() {
	return this.bool() ? 1 : 0;
})
Random.prototype.define("sign", function() {
	return this.bool() ? 1 : -1;
})
Random.prototype.define("index", function(arr) {
	return this.integer(0, arr.length - 1);
})
Random.prototype.define("float", function(min, max) {
	min = min == null ? MIN_INT : min;
	max = max == null ? MAX_INT : max;
	return min + (max - min) * Math.random();
})
Random.prototype.define("integer", function(min, max) {
	min = min == null ? MIN_INT : ~~min;
	max = max == null ? MAX_INT : ~~max;
	return Math.round(rand(min - 0.5, max + 0.499999999999));
})
Random.prototype.define("string", function(length, charSet) {
	var result = [];
	length = length || 16;
	charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	while (length--) {
		result.push(charSet[Math.floor(Math.random() * charSet.length)]);
	}
	return result.join('');
})
Random.prototype.define("color", function() {
	return new Color({
		r: Math.floor(Math.random() * 255),
		g: Math.floor(Math.random() * 255),
		b: Math.floor(Math.random() * 255)
	})
})
Random.prototype.define("choice", function(str) {
	return str[this.between(0, str.length)]
})
Random.prototype.define("hex", function(size) {
	var _chars = '0123456789abcdef'.split('');
	size = size && size > 0 ? size : 6
	var str = '';
	while (size--) {
		str += this.choice(_chars)
	}
	return str;
})
Random.prototype.define("guid", function() {
	var result =
		this.hex(8) +
		'-' +
		this.hex(4) +
		'-' +
		'4' +
		this.hex(3) +
		'-' +
		choice(8, 9, 'a', 'b') +
		this.hex(3) +
		'-' +
		this.hex(12)
	return result
})
Random.prototype.define("word", function(list, n) {
	var result = [];
	for (var i = 0; i < n; i++) {
		result.push(list[Math.random(0, list.length)]);
	}
	return result;
})
Random.prototype.define("chance", function(d, n) {
	var n = n || 1;
	return Math.floor(Math.random() * d + 1) * n === d;
})
Random.prototype.define("color", function() {
	return "#" + this.hex(6)
})

Random.prototype.define("deterministic", function(seed) {
	var seed = seed || 0x2F6E2B1;
	return function() {
		seed = ((seed + 0x7ED55D16) + (seed <<  12)) & 0xFFFFFFFF;
		seed = ((seed ^ 0xC761C23C) ^ (seed >>> 19)) & 0xFFFFFFFF;
		seed = ((seed + 0x165667B1) + (seed <<   5)) & 0xFFFFFFFF;
		seed = ((seed + 0xD3A2646C) ^ (seed <<   9)) & 0xFFFFFFFF;
		seed = ((seed + 0xFD7046C5) + (seed <<   3)) & 0xFFFFFFFF;
		seed = ((seed ^ 0xB55A4F09) ^ (seed >>> 16)) & 0xFFFFFFFF;
		return (seed & 0xFFFFFFF) / 0x10000000;
	}
})
