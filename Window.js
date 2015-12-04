(function()
{
	window.nativeAlert = window.alert
	window.alert = function() {window.nativeAlert(Array.prototype.slice.call(arguments).join(", "))}
	window.onerror = function(msg, url, line) {window.nativeAlert("Message: " + msg, "\nurl: " + url, "\nLine Number: " + line )}
	window.connect = function(a)
	{
		if (a == true)
		{
			window.addEventListener("offline",	function(e) {alert("offline")}, false)
			window.addEventListener("online", 	function(e) {alert("online")}, false)
		}
		return window.navigator.onLine
	}
	window.js = function(a) {window.navigator.javaEnabled(a); return window.navigator.javaEnabled()}
	window.taint = function(a) {window.navigator.taintEnabled(a);	return window.navigator.taintEnabled()}
	window.title = function() 	{document.title(Array.prototype.slice.call(arguments).join(", "))}
	window.video = function() 	{return !!document.createel('video').canPlayType}
	window.empty = function(a) 	{return !(typeof a === "undefined")}
	window.type = function(input)
	{
		if (input instanceof String) 	{return "String"}
		if (input instanceof Number) 	{return "Number"}
		if (input instanceof Boolean)	{return "Boolean"}
		if (input instanceof Object) 	{return "Object"}
		if (input instanceof Array) 	{return "Array"}
		return typeof input
	}
	window.url = function() {return window.location.pathname}
	window.goto = function(url) {window.location.href = url}
	window.getWindowCoords = (navigator.userAgent.toLowerCase().indexOf('opera')>0||navigator.appVersion.toLowerCase().indexOf('safari')!=-1)?function()
	{
		canvasX = window.innerWidth;
		canvasY = window.innerHeight;
	}:function() 
	{
		canvasX = document.documentElement.clientWidth||document.body.clientWidth||document.body.scrollWidth;
		canvasY = document.documentElement.clientHeight||document.body.clientHeight||document.body.scrollHeight;
	}
	window.onresize = window.getWindowCoords
	window.apiload = function()
	{
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
})()

function isLessThanIE(version)
{
	if (navigator.appName === 'Microsoft Internet Explorer')
	{
		var ua = navigator.userAgent, re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})")
		if (re.exec(ua) !== null) {if (parseFloat(RegExp.$1) < version) {return true}}
	}
	return false
}

function insertAtCursor(myField, myValue)
{
	if (document.selection)
	{
		myField.focus()
		sel = document.selection.createRange()
		sel.text = myValue
	}
	else if (myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart
		var endPos = myField.selectionEnd
		restoreTop = myField.scrollTop

		myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length)

		myField.selectionStart = startPos + myValue.length
		myField.selectionEnd = startPos + myValue.length

		if (restoreTop > 0) {myField.scrollTop = restoreTop}
	}
	else {myField.value += myValue}
}










// function Position()
// {

// 	this.offset = function()		{return {x: window.pageXOffset, y: window.pageYOffset}}
// 	this.dimensions = function(){return {inner: {width: window.innerWidth, height: window.innerHeight}, outer: {width: window.outerWidth, height: window.outerHeight}}}
// 	this.d = function() {return {i: {w: window.innerWidth, h: window.innerHeight}, o: {w: window.outerWidth, h: window.outerHeight}}}
// 	// resizeBy()	 Resizes the window by the specified pixels
// 	// resizeTo()	 Resizes the window to the specified width and height
// 	// scroll()
// 	// scrollBy()	 Scrolls the content by the specified number of pixels
// 	// scrollTo()	 Scrolls the content to the specified coordinates

// 	this.viewport = function()
// 	{
// 		var w = isLessThanIE(8)?(!(document.documentElement.clientWidth)	|| (document.documentElement.clientWidth===0))?document.body.clientWidth:document.documentElement.clientWidth:window.innerWidth
// 		var h = isLessThanIE(8)?(!(document.documentElement.clientHeight) 	|| (document.documentElement.clientHeight===0))?document.body.clientHeight:document.documentElement.clientHeight:window.innerHeight;
// 		return {width: w, height: h}
// 	}
// }

// function Timer()
// {
// 	// window.setInterval() Calls a function or evaluates an expression at specified intervals (in milliseconds)
// 	// window.setTimeout()			Calls a function or evaluates an expression after a specified number of milliseconds
// 	// window.clearInterval()	 Clears a timer set with setInterval()
// 	// window.clearTimeout()		Clears a timer set with setTimeout()

// 	this.timedRefresh = function(timeoutPeriod) {window.setTimeout("window.location.reload(true);", timeoutPeriod)}

// }


// function Pane()
// {
// 	// alert()	Displays an alert box with a message and an OK button
// 	// blur()	 Removes focus from the current window

// 	// close()	Closes the current window
// 	// confirm()		Displays a dialog box with a message and an OK and a Cancel button
// 	// createPopup()		Creates a pop-up window
// 	// focus()	Sets focus to the current window
// 	// moveBy() Moves a window relative to its current position
// 	// moveTo() Moves a window to the specified position
// 	// open()	 Opens a new browser window
// 	// print()	Prints the content of the current window
// 	// prompt() Displays a dialog box that prompts the visitor for input

// 	this.iframes = function()	 {return {frames: window.frames, length: window.length}}

// 	this.context = function()	 {return {self: window.self, parent: window.parent, opener: window.opener, top: window.top}}

// }



// function Screen()
// {
// 	this.top			= window.screenTop
// 	this.left	 		= window.screenLeft
// 	this.x				= window.screenX
// 	this.y				= window.screenY

// 	this.availHeight	= window.screen.availHeight // Returns the height of the screen (excluding the Windows Taskbar)
// 	this.availWidth		= window.screen.availWidth	// Returns the width of the screen (excluding the Windows Taskbar)
// 	this.colorDepth		= window.screen.colorDepth	// Returns the bit depth of the color palette for displaying images
// 	this.height			= window.screen.height		// Returns the total height of the screen
// 	this.pixelDepth		= window.screen.pixelDepth	// Returns the color resolution (in bits per pixel) of the screen
// 	this.width			= window.screen.width		// Returns the total width of the screen
// }

// function History()
// {
// 	this.length		= function() 	{return window.history.length}
// 	this.back		= function()	{window.history.back()}
// 	this.backward	= function()	{window.history.back()}
// 	this.forward	= function()	{window.history.forward()}
// 	this.go 		= function(i) 	{window.history.go(i)}
// }

// window.location.hash		 // Returns the anchor portion of a URL
// window.location.host		 // Returns the hostname and port of a URL
// window.location.hostname // Returns the hostname of a URL
// window.location.href		 // Returns the entire URL
// window.location.pathname // Returns the path name of a URL
// window.location.port		 // Returns the port number the server uses for a URL
// window.location.protocol // Returns the protocol of a URL
// window.location.search	 // Returns the query portion of a URL

// assign() Loads a new document
// reload() Reloads the current document
// replace()		Replaces the current document with a new one



