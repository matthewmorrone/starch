
Color = Object.create(Object.prototype) //{} //Object.create(null)
Color.define("random", function() {
	return "rgb(" + (Math.random() * 100) + "%, " + (Math.random() * 100) + "%, " + (Math.random() * 100) + "%)"
})

function Color(r, g, b, a) {
	if (!a) {
		a = 1
	}

	this.r = r
	this.g = g
	this.b = b
	this.a = a

	this.rgb = function() {
		return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")"
	}

	this.rgba = function() {
		return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")"
	}

	this.rgb2hex = function(r, g, b) {
		var hex = [r.toString(16), g.toString(16), b.toString(16)]
		$.each(hex, function(nr, val) {
			if (val.length === 1) {
				hex[nr] = "0" + val;
			}
		})
		return hex.join("").toUpperCase()
	}

	this.hex2rgb = function(hex) {
		R = hexToR(hex);
		G = hexToG(hex);
		B = hexToB(hex);
		return "rgb(" + R + ", " + G + ", " + B + ")"
	}

	function hexToR(h) {
		return parseInt((cutHex(h)).substring(0, 2), 16)
	}

	function hexToG(h) {
		return parseInt((cutHex(h)).substring(2, 4), 16)
	}

	function hexToB(h) {
		return parseInt((cutHex(h)).substring(4, 6), 16)
	}

	function cutHex(h) {
		return (h.charAt(0) == "#") ? h.substring(1, 7) : h
	}

	this.random = function(a) {
		if (a == "hex") {
			var letters = '0123456789ABCDEF'.split('')
			var color = '#'
			for (var i = 0; i < 6; i++) {
				color += letters[Math.round(Math.random() * 15)]
			}
			return color
		}
		if (a == "rgb") {
			return "rgb(" + randomnumber(0, 255, 0) + ", " + randomnumber(0, 255, 0) + ", " + randomnumber(0, 255, 0) + ")"
		}
		if (a == "rgba") {
			return "rgba(" + randomnumber(0, 255, 0) + ", " + randomnumber(0, 255, 0) + ", " + randomnumber(0, 255, 0) + ", " + alpha + ")"
		}
	}
}

function colorFormat(r, g, b, a) {
	if (r > 255) {
		r = 255
	}
	if (g > 255) {
		g = 255
	}
	if (b > 255) {
		b = 255
	}

	var color = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")"
	$("title").html(color)
	return color
}

function colorChooser() {
	var c1 = Math.round(parseInt($("#d1").slider("value")))
	var c2 = Math.round(parseInt($("#d2").slider("value")))
	var c3 = Math.round(parseInt($("#d3").slider("value")))
	var v = (c1 + c2 + c3) / 12 - .25

	var r = Math.round(510 * (1 - v))
	var g = Math.round(510 * v)

	var color = colorFormat(r, g, 0, .75)

	return color
}

var colors = [
	{"hex": "F0F8FF", "name": "aliceblue"},
	{"hex": "FFA07A", "name": "lightsalmon"},
	{"hex": "FAEBD7", "name": "antiquewhite"},
	{"hex": "20B2AA", "name": "lightseagreen"},
	{"hex": "00FFFF", "name": "aqua"},
	{"hex": "87CEFA", "name": "lightskyblue"},
	{"hex": "7FFFD4", "name": "aquamarine"},
	{"hex": "778899", "name": "lightslategray"},
	{"hex": "F0FFFF", "name": "azure"},
	{"hex": "B0C4DE", "name": "lightsteelblue"},
	{"hex": "F5F5DC", "name": "beige"},
	{"hex": "FFFFE0", "name": "lightyellow"},
	{"hex": "FFE4C4", "name": "bisque"},
	{"hex": "00FF00", "name": "lime"},
	{"hex": "000000", "name": "black"},
	{"hex": "32CD32", "name": "limegreen"},
	{"hex": "FFEBCD", "name": "blanchedalmond"},
	{"hex": "FAF0E6", "name": "linen"},
	{"hex": "0000FF", "name": "blue"},
	{"hex": "FF00FF", "name": "magenta"},
	{"hex": "8A2BE2", "name": "blueviolet"},
	{"hex": "800000", "name": "maroon"},
	{"hex": "A52A2A", "name": "brown"},
	{"hex": "66CDAA", "name": "mediumaquamarine"},
	{"hex": "DEB887", "name": "burlywood"},
	{"hex": "0000CD", "name": "mediumblue"},
	{"hex": "5F9EA0", "name": "cadetblue"},
	{"hex": "BA55D3", "name": "mediumorchid"},
	{"hex": "7FFF00", "name": "chartreuse"},
	{"hex": "9370DB", "name": "mediumpurple"},
	{"hex": "D2691E", "name": "chocolate"},
	{"hex": "3CB371", "name": "mediumseagreen"},
	{"hex": "FF7F50", "name": "coral"},
	{"hex": "7B68EE", "name": "mediumslateblue"},
	{"hex": "6495ED", "name": "cornflowerblue"},
	{"hex": "00FA9A", "name": "mediumspringgreen"},
	{"hex": "FFF8DC", "name": "cornsilk"},
	{"hex": "48D1CC", "name": "mediumturquoise"},
	{"hex": "DC143C", "name": "crimson"},
	{"hex": "C71585", "name": "mediumvioletred"},
	{"hex": "00FFFF", "name": "cyan"},
	{"hex": "191970", "name": "midnightblue"},
	{"hex": "00008B", "name": "darkblue"},
	{"hex": "F5FFFA", "name": "mintcream"},
	{"hex": "008B8B", "name": "darkcyan"},
	{"hex": "FFE4E1", "name": "mistyrose"},
	{"hex": "B8860B", "name": "darkgoldenrod"},
	{"hex": "FFE4B5", "name": "moccasin"},
	{"hex": "A9A9A9", "name": "darkgray"},
	{"hex": "FFDEAD", "name": "navajowhite"},
	{"hex": "006400", "name": "darkgreen"},
	{"hex": "000080", "name": "navy"},
	{"hex": "BDB76B", "name": "darkkhaki"},
	{"hex": "FDF5E6", "name": "oldlace"},
	{"hex": "8B008B", "name": "darkmagenta"},
	{"hex": "808000", "name": "olive"},
	{"hex": "556B2F", "name": "darkolivegreen"},
	{"hex": "6B8E23", "name": "olivedrab"},
	{"hex": "FF8C00", "name": "darkorange"},
	{"hex": "FFA500", "name": "orange"},
	{"hex": "9932CC", "name": "darkorchid"},
	{"hex": "FF4500", "name": "orangered"},
	{"hex": "8B0000", "name": "darkred"},
	{"hex": "DA70D6", "name": "orchid"},
	{"hex": "E9967A", "name": "darksalmon"},
	{"hex": "EEE8AA", "name": "palegoldenrod"},
	{"hex": "8FBC8F", "name": "darkseagreen"},
	{"hex": "98FB98", "name": "palegreen"},
	{"hex": "483D8B", "name": "darkslateblue"},
	{"hex": "AFEEEE", "name": "paleturquoise"},
	{"hex": "2F4F4F", "name": "darkslategray"},
	{"hex": "DB7093", "name": "palevioletred"},
	{"hex": "00CED1", "name": "darkturquoise"},
	{"hex": "FFEFD5", "name": "papayawhip"},
	{"hex": "9400D3", "name": "darkviolet"},
	{"hex": "FFDAB9", "name": "peachpuff"},
	{"hex": "FF1493", "name": "deeppink"},
	{"hex": "CD853F", "name": "peru"},
	{"hex": "00BFFF", "name": "deepskyblue"},
	{"hex": "FFC0CB", "name": "pink"},
	{"hex": "696969", "name": "dimgray"},
	{"hex": "DDA0DD", "name": "plum"},
	{"hex": "1E90FF", "name": "dodgerblue"},
	{"hex": "B0E0E6", "name": "powderblue"},
	{"hex": "B22222", "name": "firebrick"},
	{"hex": "800080", "name": "purple"},
	{"hex": "FFFAF0", "name": "floralwhite"},
	{"hex": "FF0000", "name": "red"},
	{"hex": "228B22", "name": "forestgreen"},
	{"hex": "BC8F8F", "name": "rosybrown"},
	{"hex": "FF00FF", "name": "fuchsia"},
	{"hex": "4169E1", "name": "royalblue"},
	{"hex": "DCDCDC", "name": "gainsboro"},
	{"hex": "8B4513", "name": "saddlebrown"},
	{"hex": "F8F8FF", "name": "ghostwhite"},
	{"hex": "FA8072", "name": "salmon"},
	{"hex": "FFD700", "name": "gold"},
	{"hex": "FAA460", "name": "sandybrown"},
	{"hex": "DAA520", "name": "goldenrod"},
	{"hex": "2E8B57", "name": "seagreen"},
	{"hex": "808080", "name": "gray"},
	{"hex": "FFF5EE", "name": "seashell"},
	{"hex": "008000", "name": "green"},
	{"hex": "A0522D", "name": "sienna"},
	{"hex": "ADFF2F", "name": "greenyellow"},
	{"hex": "C0C0C0", "name": "silver"},
	{"hex": "F0FFF0", "name": "honeydew"},
	{"hex": "87CEEB", "name": "skyblue"},
	{"hex": "FF69B4", "name": "hotpink"},
	{"hex": "6A5ACD", "name": "slateblue"},
	{"hex": "CD5C5C", "name": "indianred"},
	{"hex": "708090", "name": "slategray"},
	{"hex": "4B0082", "name": "indigo"},
	{"hex": "FFFAFA", "name": "snow"},
	{"hex": "FFFFF0", "name": "ivory"},
	{"hex": "00FF7F", "name": "springgreen"},
	{"hex": "F0E68C", "name": "khaki"},
	{"hex": "4682B4", "name": "steelblue"},
	{"hex": "E6E6FA", "name": "lavender"},
	{"hex": "D2B48C", "name": "tan"},
	{"hex": "FFF0F5", "name": "lavenderblush"},
	{"hex": "008080", "name": "teal"},
	{"hex": "7CFC00", "name": "lawngreen"},
	{"hex": "D8BFD8", "name": "thistle"},
	{"hex": "FFFACD", "name": "lemonchiffon"},
	{"hex": "FF6347", "name": "tomato"},
	{"hex": "ADD8E6", "name": "lightblue"},
	{"hex": "40E0D0", "name": "turquoise"},
	{"hex": "F08080", "name": "lightcoral"},
	{"hex": "EE82EE", "name": "violet"},
	{"hex": "E0FFFF", "name": "lightcyan"},
	{"hex": "F5DEB3", "name": "wheat"},
	{"hex": "FAFAD2", "name": "lightgoldenrodyellow"},
	{"hex": "FFFFFF", "name": "white"},
	{"hex": "90EE90", "name": "lightgreen"},
	{"hex": "F5F5F5", "name": "whitesmoke"},
	{"hex": "D3D3D3", "name": "lightgrey"},
	{"hex": "FFFF00", "name": "yellow"},
	{"hex": "FFB6C1", "name": "lightpink"},
	{"hex": "9ACD32", "name": "yellowgreen"}
]