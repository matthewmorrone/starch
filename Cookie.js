function Cookie() {
	this.get = function(name) {
		var i, x, y, ARRcookies = document.cookie.split(";")
		for (i = 0; i < ARRcookies.length; i++) {
			x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="))
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1)
			x = x.replace(/^\s+|\s+$/g, "")
			if (x == name) {
				return unescape(y)
			}
		}
	}

	this.set = function(name, value, exdays) {
		var exdate = new Date()
		exdate.setDate(exdate.getDate() + exdays)
		var cvalue = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString())
		document.cookie = name + "=" + cvalue
	}

	this.unset = function(name) {
		setCookie(name, "", -1)
		return name
	}

	this.clear = function() {
		var cookies = document.cookie.split(";")
		for (var i = 0; i < cookies.length; i++) {
			unsetCookie(cookies[i].split("=")[0])
		}
	}
}