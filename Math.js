function comp_sum(array) {
	var sum = 0
	for (i in array) {
		sum += parseInt(array[i])
	}
	return sum
}

function comp_ave(array) {
	var ave = comp_sum(array) / array.length
	return ave
}

function comp_dev(array) {
	var mean = comp_ave(array)
	var dev = 0
	for (i in array) {
		array[i] = (array[i] - mean)
	}
	for (i in array) {
		array[i] = (array[i] * array[i])
	}
	for (i in array) {
		dev += array[i]
	}
	dev /= (array.length - 1)
	dev = Math.sqrt(dev)
	return dev
}

function get_r(xs, ys, xbar, ybar, sdx, sdy) {
	var xy = 0
	for (var j = 0; j < xs.length; j++) {
		xs[j] = parseFloat(xs[j])
		ys[j] = parseFloat(ys[j])
		xy += (xs[j] - xbar) * (ys[j] - ybar)
	}
	corr = Math.round(1 / (xs.length - 1) * xy / (sdx * sdy) * 10000) / 10000
	return corr
}

function least_squares(twodarray) {
	var ave = []
	for (var j = 0; j < twodarray[0].length; j++) {
		aver = []
		for (var i = 0; i < twodarray.length; i++) {
			aver.push(twodarray[i][j])
		}
		ave.push(aver)
	}
	var xbar = comp_ave(ave[0].slice())
	var ybar = comp_ave(ave[1].slice())
	var sdx = comp_dev(ave[0].slice())
	var sdy = comp_dev(ave[1].slice())
	var r = get_r(ave[0].slice(), ave[1].slice(), xbar, ybar, sdx, sdy)

	var b = r * (sdy / sdx)
	var a = ybar - (b * xbar)

	return [a, b].slice()
}

function convert(src, srcAlphabet, dstAlphabet, caps) {
	alphabet = "0123456789abcdefghijklmnopqrstuvwxyz"

	if (caps == true) {
		alphabet = alphabet.toUpperCase()
	}
	if (typeof src === "number") {
		src = String(src)
	}
	if (typeof srcAlphabet !== typeof dstAlphabet) {
		TypeError("Alphabet types don't match. ")
	}
	if (typeof srcAlphabet === "number") {
		var srcBase = srcAlphabet
		var dstBase = dstAlphabet
		srcAlphabet = alphabet.substring(0, srcBase)
		dstAlphabet = alphabet.substring(0, dstBase)
	}
	if (typeof srcAlphabet === "string") {
		var srcBase = srcAlphabet.length
		var dstBase = dstAlphabet.length
	}
	var wet = src,
		val = 0,
		mlt = 1
	while (wet.length > 0) {
		var digit = wet.charAt(wet.length - 1)
		val += mlt * srcAlphabet.indexOf(digit)
		wet = wet.substring(0, wet.length - 1)
		mlt *= srcBase
	}
	wet = val
	var ret = ""
	while (wet >= dstBase) {
		var digitVal = wet % dstBase
		var digit = dstAlphabet.charAt(digitVal)
		ret = digit + ret
		wet /= dstBase
	}
	var digit = dstAlphabet.charAt(wet)
	return digit + ret
}
function base26(value) {
	var converted = ""
	var iteration = false
	do {
		var remainder = value % 26 + 1
		if (iteration == false && value < 26) {
			remainder--
		}
		converted = String.fromCharCode(64 + remainder) + converted
		value = (value - remainder) / 26

		iteration = true
	}
	while (value > 0)
	return converted
}


