Element.define("create", function(tag, arg) {
	var elem = document.createElement(tag)
	if (arg) {
		var attrs = arg
		for (var attr in attrs) {
			elem.setAttribute([attr], attrs[attr])
		}
	}
	return elem
})
window.define("create", Element.create)
Element.prototype.define("inner", function() {
	if (arguments.length === 0) {
		return this.innerHTML
	}
	this.innerHTML = arguments[0]
	return this
})
Element.prototype.define("replaceWith", function(newNode) {
	return this.parentNode.replaceChild(newNode, this)
})
Element.prototype.define("before", function(htmlString) {
	return this.insertAdjacentHTML('beforebegin', htmlString)
})
Element.prototype.define("after", function(htmlString) {
	return this.insertAdjacentHTML('afterend', htmlString)
})
Element.prototype.define("append", function(htmlString) {
	return this.insertAdjacentHTML('beforeend', htmlString)
})
Element.prototype.define("prepend", function(htmlString) {
	log(htmlString)
	return this.insertAdjacentHTML('afterbegin', htmlString)
})
Element.prototype.define("hide", function() {
	this.style.display = 'none'
	return this
})
Element.prototype.define("show", function() {
	this.style.display = ''
	return this
})
Element.prototype.define("on", function(eventName, handler) {
	if (this.addEventListener) {
		this.addEventListener(eventName, handler)
	}
	else {
		this.attachEvent('on' + eventName, function() {
			handler.call(this)
		})
	}
	return this
})
Element.prototype.define("off", function(eventName, handler) {
	if (this.removeEventListener) {
		this.removeEventListener(eventName, handler)
	}
	else {
		this.detachEvent('on' + eventName, handler)
	}
	return this
})
Element.prototype.define("addClass", function(className) {
	if (this.classList) {
		this.classList.add(className)
	}
	else {
		this.className += ' ' + className
	}
	return this
})
Element.prototype.define("hasClass", function(className) {
	if (this.classList) {
		this.classList.contains(className)
	}
	else {
		new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className)
	}
	return this
})
Element.prototype.define("removeClass", function(className) {
	if (this.classList) {
		this.classList.remove(className)
	}
	else {
		this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
	}
	return this
})
Element.prototype.define("toggleClass", function() {
	if (el.classList) {
		el.classList.toggle(className)
	}
	else {
		var classes = el.className.split(' ')
		var existingIndex = -1
		for (var i = classes.length; i--;) {
			if (classes[i] === className) {
				existingIndex = i
			}
		}
		if (existingIndex >= 0) {
			classes.splice(existingIndex, 1)
		}
		else {
			classes.push(className)
		}
		el.className = classes.join(' ')
	}
	return this
})
Element.prototype.define("attr", function() {
	if (arguments.length === 1) {
		return this.getAttribute(arguments[0])
	}
	if (arguments.length === 2) {
		return this.setAttribute(arguments[0], arguments[1])
	}
	return this
})
Element.prototype.define("children", function() {
	var children = []
	for (var i = this.children.length; i--;) {
		if (this.children[i].nodeType != 8) {
			children.unshift(this.children[i])
		}
	}
	return children
})
Element.prototype.define("clone", function() {
	return this.cloneNode(true)
})
Element.prototype.define("contains", function(child) {
	return this !== child && this.contains(child)
})
Element.prototype.define("containsSelector", function(selector) {
	return this.querySelector(selector) !== null
})
Element.prototype.define("empty", function() {
	while (this.firstChild) {
		this.removeChild(this.firstChild)
	}
	return this
})
Element.prototype.define("find", function(selector) {
	return this.querySelectorAll(selector)
})
Element.prototype.define("html", function() {
	if (arguments.length === 1) {
		this.innerHTML = arguments[0]
	}
	return this.innerHTML
})
Element.prototype.define("replaceWith", function(str) {
	this.outerHTML = str
	return this
})
Element.prototype.define("toString", function() {
	return this.outerHTML
})
Element.prototype.define("text", function() {
	if (arguments.length === 1) {
		if (this.textContent !== undefined) {
			this.textContent = arguments[0]
		}
		else {
			this.innerText = arguments[0]
		}
	}
	return this.textContent || this.innerText
})
Element.prototype.define("is", function() {
	if (arguments[0] instanceof jQuery) {
		return this === arguments[0]
	}
	else {
		var selector = arguments[0]
		var _matches = (this.matches || this.matchesSelector || this.msMatchesSelector || this.mozMatchesSelector || this.webkitMatchesSelector || this.oMatchesSelector)
		if (_matches) {
			return _matches.call(this, selector)
		}
		else {
			var nodes = this.parentNode.querySelectorAll(selector)
			for (var i = nodes.length; i--;) {
				if (nodes[i] === this) {
					return true
				}
			}
			return false
		}
	}
})
Element.prototype.define("next", function() {
	// nextSibling can include text nodes
	function nextElementSibling(el) {
		do {
			el = el.nextSibling
		} while (el && el.nodeType !== 1)
		return el
	}
	return this.nextElementSibling || nextElementSibling(this)
})
Element.prototype.define("offset", function() {
	var rect = el.getBoundingClientRect()
	return {
		top: rect.top + document.body.scrollTop,
		left: rect.left + document.body.scrollLeft
	}
})
Element.prototype.define("offsetParent", function() {
	return this.offsetParent || this
})
Element.prototype.define("offsetHeight", function() {
	return this.offsetHeight
})
Element.prototype.define("outerHeight", function() {
	var height = this.offsetHeight
	var style = this.currentStyle || getComputedStyle(this)
	height += parseInt(style.marginTop) + parseInt(style.marginBottom)
	return height
})
Element.prototype.define("offsetWidth", function() {
	return this.offsetWidth
})
Element.prototype.define("outerWidth", function() {
	var width = this.offsetWidth
	var style = this.currentStyle || getComputedStyle(this)
	width += parseInt(style.marginLeft) + parseInt(style.marginRight)
	return width
})
Element.prototype.define("parent", function() {
	return this.parentNode
})
Element.prototype.define("position", function() {
	return {
		left: this.offsetLeft,
		top: this.offsetTop
	}
})
Element.prototype.define("prev", function() {
	function previousElementSibling(el) {
		do {
			el = el.previousSibling
		} while (el && el.nodeType !== 1)
		return el
	}
	this.previousElementSibling || previousElementSibling(this)
})
Element.prototype.define("remove", function() {
	return this.parentNode.removeChild(this)
})
Element.prototype.define("siblings", function() {
	var siblings = Array.prototype.slice.call(this.parentNode.children)
	for (var i = siblings.length; i--;) {
		if (siblings[i] === this) {
			siblings.splice(i, 1)
			break
		}
	}
	return siblings
})
Element.prototype.define("trigger", function(eventName) {
	if (document.createEvent) {
		var event = document.createEvent('HTMLEvents')
		event.initEvent(eventName, true, false)
		this.dispatchEvent(event)
	}
	else {
		this.fireEvent('on' + eventName)
	}
	return this
})
Element.prototype.define("all", function() {
	return this.childNodes
})
Element.prototype.define("first", function() {
	return this.firstChild
})
Element.prototype.define("last", function() {
	return this.lastChild
})
Element.prototype.define("closest", function(selector) {
	var elem = this
	var firstChar = selector.charAt(0)
	for (; elem && elem !== document; elem = elem.parentNode) {
		if (firstChar === '.') {
			if (elem.classList.contains(selector.substr(1))) {
				return elem
			}
		}
		if (firstChar === '#') {
			if (elem.id === selector.substr(1)) {
				return elem
			}
		}
		if (firstChar === '[') {
			if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
				return elem
			}
		}
		if (elem.tagName.toLowerCase() === selector) {
			return elem
		}
	}
	return false
})
Element.prototype.define("parents", function(selector) {
	var elem = this
	var parents = []
	if (selector) {
		var firstChar = selector.charAt(0)
	}
	for (; elem && elem !== document; elem = elem.parentNode) {
		if (selector) {
			if (firstChar === '.') {
				if (elem.classList.contains(selector.substr(1))) {
					parents.push(elem)
				}
			}
			if (firstChar === '#') {
				if (elem.id === selector.substr(1)) {
					parents.push(elem)
				}
			}
			if (firstChar === '[') {
				if (elem.hasAttribute(selector.substr(1, selector.length - 1))) {
					parents.push(elem)
				}
			}
			if (elem.tagName.toLowerCase() === selector) {
				parents.push(elem)
			}
		}
		else {
			parents.push(elem)
		}
	}
	if (parents.length === 0) {
		return null
	}
	else {
		return parents
	}
})