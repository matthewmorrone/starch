Object.defineProperty(Object.prototype, "define", {
	configurable: true,
	enumerable: false,
	writable: true,
	value: function(name, value) {
		if (Object[name]) {
			delete Object[name]
		}
		Object.defineProperty(this, name, {
			configurable: true,
			enumerable: false,
			writable: true,
			value: value
		})
		return this
	}
})
Object.prototype.define("extend", function(src) {
	var target = this
	if (isObject(src)) {
		for (var o in src) {
			if (Object[src[o]]) {
				delete Object[src[o]]
			}
			this.define(o, src[o])
		}
	}
	return this
})
Object.define("setPrototypeOf", function(obj, proto) {
	obj.__proto__ = proto
	return obj
})
Object.prototype.define("setPrototypeOf", function(obj, proto) {
	obj.__proto__ = proto
	return obj
})
Object.prototype.extend({
	"hasProperty": function(a) {
		return Object.hasOwnProperty(this, a)
	},
	"getPropertyName": function(a) {
		return Object.getOwnPropertyName(this, a)
	},
	"getPropertyNames": function() {
		return Object.getOwnPropertyNames(this)
	},
	"getPropertyDescriptor": function(a) {
		return Object.getOwnPropertyDescriptor(this, a)
	},
	"getPropertyDescriptors": function() {
		var result = {}
		Object.getOwnPropertyNames(this).each(function(a, b) {
			result[a] = Object.getOwnPropertyDescriptor(this, a)
		}, this)
		return result
	},
	"each": function(f) {
		for (var i in this) {
			f && this.hasProperty(i) && f.call(this, this[i], i)
		}
		return this
	}
})
Object.prototype.define("eachOwn", function(fn) {
	var o = this
	Object.keys(o).each(function(key) {
		fn.call(o, o[key], key)
	})
})
Object.prototype.define("forEach", function(callback, scope) {
	var collection = this
	if (Object.prototype.toString.call(collection) === '[object Object]') {
		for (var prop in collection) {
			if (Object.prototype.hasOwnProperty.call(collection, prop)) {
				callback.call(scope, collection[prop], prop, collection)
			}
		}
	}
	else {
		for (var i = 0, len = collection.length; i < len; i++) {
			callback.call(scope, collection[i], i, collection)
		}
	}
})
Object.prototype.define("assign", function(...sources) {
	var target = this
	sources.forEach(source => {
		var descriptors = Object.keys(source).reduce((descriptors, key) => {
			descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
			return descriptors;
		}, {})
		Object.getOwnPropertySymbols(source).forEach(sym => {
			var descriptor = Object.getOwnPropertyDescriptor(source, sym)
			if (descriptor.enumerable) {
				descriptors[sym] = descriptor
			}
		})
		Object.defineProperties(target, descriptors)
	})
	return target;
})
Object.prototype.define("map", function(fn, ctx) {
	var ctx = ctx || this,
		self = this,
		result = {}
	Object.keys(self).each(function(v, k) {
		result[k] = fn.call(ctx, self[k], k, self)
	})
	return result
})
Object.define('clone', function(obj) {
	if (Array.isArray(obj)) {
		result = []
	}
	else {
		var result = {};
	}

	for (var key in obj) {
		var val = obj[key];

		if (Array.isArray(val)) {
			result[key] = Object.clone(val.slice());
		}
		else if (val === null) {
			result[key] = val;
		}
		else if (val === undefined) {
			continue;
		}
		else if (typeof val === "object") {
			result[key] = Object.clone(val);
		}
		else {
			result[key] = val;
		}
	}
	return result;
})
Object.prototype.define("clone", function() {

	return JSON.parse(JSON.stringify(this))
})
Object.define('merge', function(target, obj) {
	for (var key in obj) {
		var next = obj[key];
		var current = target[key];
		if (Array.isArray(next)) {
			target[key] = Object.clone(next.slice());
		}
		else if (next === null) {
			target[key] = next;
		}
		else if (next === undefined) {
			continue;
		}
		else if (typeof next === 'object') {
			if (current === null) {
				current = Object.clone(next);
			}
			else if (typeof current === 'object') {
				current.absorb(next);
			}
			else if (current === undefined) {
				current = Object.clone(next);
			}
		}
		else {
			target[key] = next;
		}
	}
	return target;
})
Object.prototype.define('stringify', function(replacer, space) {

	return JSON.stringify(this, replacer, space);
})
Object.prototype.define("type", function() {
	// Object.prototype.toString.call(this).replace(/^\[object (.+)\]$/, "$1").toLowerCase()
	var x = this
	if (x === null) {
		return 'Null'
	}
	if (x === undefined) {
		return 'Undefined'
	}
	var type = x.toString()
	return type.slice(type.indexOf(' ' + 1), -1)
})
Object.prototype.define("log", function() {
	return log(this)
})
Object.prototype.define("size", function() {
	return this.length || Object.keys(this).length
})
Object.prototype.define("str", function() {
	return JSON.stringify(this)
})
Object.prototype.define("toInt", function() {
	return parseInt(this, (arguments[0] || 10))
})
Object.prototype.define("values", function() {
	var keys = Object.keys(this)
	var ret = []
	for (var i = 0; i < keys.length; i++) {
		ret.push(this[keys[i]])
	}
	return ret
})








