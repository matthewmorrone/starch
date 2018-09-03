(function() {


	if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = {};
	}

	// var log = console.log.bind(console)
	for (c in console) {
		if (c === "memory") {
			continue
		}
		eval(c + " = console." + c + ".bind(console)")
	}
	// eval("table = console.table.bind(console)")


	function Nihil() {}
	Nihil.prototype = Object.create(null)

	window.$_GET = function(name) {
		if (!name) {
			return new Url(window.location.href).queryPairs;
		}
		var nameEQ = name + '=',
			url = window.location.href,
			pos = url.indexOf('?'),
			url = url.slice(pos + 1),
			arr = url.split('&'),
			i = 0,
			pair = '',
			arrl = arr.length;
		for (i = 0; i < arrl; i++) {
			var pair = arr[i];
			if (pair.indexOf(nameEQ) === 0) {
				return decodeURIComponent(pair.slice(nameEQ.length).replace(/\+/g, '%20'));
			}
		}
		return null;
	}

	function loadCSS(href, tag, n) {
		"use strict"
		var link = window.document.createElement("link")
		var script = tag || window.document.getElementsByTagName("script")[0]
		link.rel = "stylesheet"
		link.href = href
		link.media = "only x"
		script.parentNode.insertBefore(link, script)
		setTimeout(function() {
			link.media = n || "all"
		})
	}


	// var nativeAlert = window.alert
	window.nativeAlert = window.alert
	window.alert = function() {
		// return nativeAlert(arguments.join("\n"))
		return window.nativeAlert(Array.prototype.slice.call(arguments).join(", "))
	}
	window.onerror = function(msg, url, line) {
		window.nativeAlert("Message: " + msg, "\nurl: " + url, "\nLine Number: " + line)
	}
	window.connect = function(a) {
		if (a == true) {
			window.addEventListener("offline", function(e) {
				alert("offline")
			}, false)
			window.addEventListener("online", function(e) {
				alert("online")
			}, false)
		}
		return window.navigator.onLine
	}
	window.js = function(a) {
		window.navigator.javaEnabled(a);
		return window.navigator.javaEnabled()
	}
	window.taint = function(a) {
		window.navigator.taintEnabled(a);
		return window.navigator.taintEnabled()
	}
	window.title = function() {
		document.title(Array.prototype.slice.call(arguments).join(", "))
	}
	window.video = function() {
		return !!document.createel('video').canPlayType
	}
	window.empty = function(a) {
		return !(typeof a === "undefined")
	}
	window.type = function(input) {
		if (input instanceof String) {
			return "String"
		}
		if (input instanceof Number) {
			return "Number"
		}
		if (input instanceof Boolean) {
			return "Boolean"
		}
		if (input instanceof Object) {
			return "Object"
		}
		if (input instanceof Array) {
			return "Array"
		}
		return typeof input
	}
	window.url = function() {
		return window.location.pathname
	}
	window.goto = function(url) {
		window.location.href = url
	}
	window.getWindowCoords = (navigator.userAgent.toLowerCase().indexOf('opera') > 0 || navigator.appVersion.toLowerCase().indexOf('safari') != -1) ? function() {
		canvasX = window.innerWidth;
		canvasY = window.innerHeight;
	} : function() {
		canvasX = document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth;
		canvasY = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
	}
	window.onresize = window.getWindowCoords
	window.apiload = function() {
		$("head").append('<script src="http://www.google.com/jsapi" type="text/javascript"></script>')
		google.load('jquery', '1.9.1')
		google.load('jqueryui', '1.5.3')
			// google.load('mootools', '1.2.1')
			// google.load('prototype', '1.6.0.3')
			// google.load('scriptaculous', '1.8.2')
			// google.load('mootools', '1.2.1')
			// google.load('dojo', '1.2.3')
			// google.load('swfobject', '2.1')
			// google.load('yui', '2.6.0')
	}
	function isLessThanIE(version) {
		if (navigator.appName === 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent,
				re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})")
			if (re.exec(ua) !== null) {
				if (parseFloat(RegExp.$1) < version) {
					return true
				}
			}
		}
		return false
	}

	function insertAtCursor(myField, myValue) {
		if (document.selection) {
			myField.focus()
			sel = document.selection.createRange()
			sel.text = myValue
		}
		else if (myField.selectionStart || myField.selectionStart == '0') {
			var startPos = myField.selectionStart
			var endPos = myField.selectionEnd
			restoreTop = myField.scrollTop

			myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length)

			myField.selectionStart = startPos + myValue.length
			myField.selectionEnd = startPos + myValue.length

			if (restoreTop > 0) {
				myField.scrollTop = restoreTop
			}
		}
		else {
			myField.value += myValue
		}
	}
})()


