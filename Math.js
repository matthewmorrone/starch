function randomNumber(min, max, round)
{
	result = (Math.random()*max)+min
	result *= Math.pow(10, round)
	result = Math.round(result)
	result /= Math.pow(10, round)
	return result
}


function comp_sum(array)
{
	var sum = 0
	for (i in array) {sum += parseInt(array[i])}
	return sum
}
function comp_ave(array)
{
	var ave = comp_sum(array)/array.length
	return ave
}
function comp_dev(array)
{
	var mean = comp_ave(array)
	var dev = 0
	for (i in array) {array[i] = (array[i] - mean)}
	for (i in array) {array[i] = (array[i] * array[i])}
	for (i in array) {dev += array[i]}
	dev /= (array.length-1)
	dev = Math.sqrt(dev)
	return dev
}
function get_r(xs, ys, xbar, ybar, sdx, sdy)
{
	var xy = 0
	for(var j = 0; j < xs.length; j++)
	{
		xs[j] = parseFloat(xs[j])
		ys[j] = parseFloat(ys[j])
		xy += (xs[j] - xbar) * (ys[j] - ybar)
	}
	corr = Math.round(1/(xs.length-1)*xy/(sdx*sdy)*10000)/10000
	return corr
}

function least_squares(twodarray)
{
	var ave = []
	for (var j = 0; j < twodarray[0].length; j++)
	{
		aver = []
		for (var i = 0; i < twodarray.length; i++)
		{
			aver.push(twodarray[i][j])
		}
		ave.push(aver)
	}
	var xbar = comp_ave(ave[0].slice())
	var ybar = comp_ave(ave[1].slice())
	var sdx = comp_dev(ave[0].slice())
	var sdy = comp_dev(ave[1].slice())
	var r = get_r(ave[0].slice(), ave[1].slice(), xbar, ybar, sdx, sdy)

	var b = r*(sdy/sdx)
	var a = ybar - (b*xbar)

	return [a, b].slice()
}






//	 floor, ceil, round
//	 max, min
//	 pow, sqrt
//	 sin, cos, tan, asin, acos, atan

//	 Math.SQRT2
//	 1.4142135623730951
//	 Math.E
//	 2.718281828459045
//	 Math.LN2
//	 0.6931471805599453
//	 Math.LN10
//	 2.302585092994046
//	 Number.MAX_VALUE
//	 Number.MIN_VALUE
//	 Number.NaN
//	 Number.POSITIVE_INFINITY
//	 Number.NEGATIVE_INFINITY

//	 Number.toFixed()
//	 String.fromCharCode(115, 99, 114, 105, 112, 116);
//	 charAt & charCodeAt


function Maths()
{
	// this.random = function(min, max, round)
	// {
	// 	result = (Math.random()*max)+min
	// 	result *= Math.pow(10, round)
	// 	result = Math.round(result)
	// 	result /= Math.pow(10, round)
	// 	return result
	// }
	// this.rand = function(n) {return Math.random()*n}
	// this.randI = function(n) {return parseInt(rnd(n))}
	this.range = function(start, end, step)
	{
		var range = []
		var typeofStart = typeof start
		var typeofEnd = typeof end

		if (step === 0) {throw TypeError("Step cannot be zero.") }
		if (typeofStart == "undefined" || typeofEnd == "undefined") {throw TypeError("Must pass start and end arguments.")}
		else if (typeofStart != typeofEnd) {throw TypeError("Start and end arguments must be of same type."+typeofStart+typeofEnd)}
		typeof step == "undefined" && (step = 1)
		if (end < start) {step = -step}
		if (typeofStart == "number") {while (step > 0 ? end >= start : end <= start) {range.push(start); start += step}}
		else if (typeofStart == "string")
		{
			if (start.length != 1 || end.length != 1) {throw TypeError("Only strings with one character are supported.") }
			start = start.charCodeAt(0)
			end = end.charCodeAt(0)
			while (step > 0 ? end >= start : end <= start) {range.push(String.fromCharCode(start)); start += step}
		}
		else {throw TypeError("Only string and number types are supported")}
		return range
	}
	this.convert = function(src, srcAlphabet, dstAlphabet, caps)
	{
		alphabet = "0123456789abcdefghijklmnopqrstuvwxyz"

		if (caps == true) {alphabet = alphabet.toUpperCase()}
		if (typeof src === "number") {src = String(src)}
		if (typeof srcAlphabet !== typeof dstAlphabet) {TypeError("Alphabet types don't match. ")}
		if (typeof srcAlphabet === "number")
		{
			var srcBase = srcAlphabet
			var dstBase = dstAlphabet
			srcAlphabet = alphabet.substring(0, srcBase)
			dstAlphabet = alphabet.substring(0, dstBase)
		}
		if (typeof srcAlphabet === "string")
		{
			var srcBase = srcAlphabet.length
			var dstBase = dstAlphabet.length
		}
		var wet = src, val = 0, mlt = 1
		while (wet.length > 0)
		{
			var digit= wet.charAt(wet.length - 1)
			val	 += mlt * srcAlphabet.indexOf(digit)
			wet			= wet.substring(0, wet.length - 1)
			mlt	 *= srcBase
		}
		wet			= val
		var ret		= ""
		while (wet >= dstBase)
		{
			var digitVal = wet % dstBase
			var digit		= dstAlphabet.charAt(digitVal)
			ret			= digit + ret
			wet /= dstBase
		}
		var digit		= dstAlphabet.charAt(wet)
		return digit + ret
	}
	this.base26 = function(value)
	{
		var converted = ""
		var iteration = false
		do
		{
			var remainder = value % 26 + 1
			if (iteration == false && value < 26)
			{
				remainder--
			}
			converted = String.fromCharCode(64 + remainder) + converted
			value = (value - remainder) / 26

			iteration = true
		}
		while (value > 0)
		return converted
	}
}()
