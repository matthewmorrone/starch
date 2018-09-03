Object.prototype.define('isObject', function(obj, strict) {
	if (strict) {
		return typeof obj === 'object' && !isNull(obj) && !isArray(obj) && !isDate(obj)
	}
	return Object.prototype.toString.call(obj) === '[object Object]' && obj !== void 0
})

(function() {
	var is = {};

	Object.defineProperties(is, {
		"int": {
			get: function() {
				var val = this.__value__;
				return val.constructor === Number && (~~val === val);
			}
		},
		"number": {
			get: function() {
				var val = this.__value__;
				return val.constructor === Number;
			}
		},
		"array": {
			get: function() {
				return this.__value__.constructor === Array;
			}
		},
		"string": {
			get: function() {
				return this.__value__.constructor === String;
			}
		},
		"object": {
			get: function() {
				return this.__value__.constructor === Object;
			}
		},
		"numeric": {
			get: function() {
				return parseFloat(this.__value__) !== NaN;
			}
		},
		"NaN": {
			get: function() {
				return isNaN(this.__value__);
			}
		},
		"function": {
			get: function() {
				return this.__value__.constructor === Function;
			}
		},
		"undefined": {
			get: function() {
				var undefined;
				return this.__value__ === undefined;
			}
		},
		"null": {
			get: function() {
				return this.__value__ === null;
			}
		},
		"ok": {
			get: function() {
				return !!this.__value__;
			}
		},
		"num": {
			get: function() {
				return this.number;
			}
		}
	});

	Object.defineProperty(Object.prototype, 'is', {
		get: function(arg) {
			var undefined;
			is.__value__ = this;
			if (arg === undefined) {
				return is;
			}
			else {
				return this instanceof arg;
			}
		}
	})
})();


(function() {
	var to = {};
	Object.defineProperties(to, {
		"string": {
			get: function() {
				var val = this.__value__,
					undefined;
				if (val.toString !== Object.prototype.toString) {
					return val.toString();
				} else if (val instanceof Object) {
					var visited = [];
					return JSON.stringify(val, function(key, value) {
						if (value instanceof Function) {
							return "[Function]";
						} else if (value instanceof Object) {
							if (~visited.indexOf(value)) {
								return "[Circular reference]";
							}
							else {
								visited[visited.length] = value;
								return value;
							}
						}
						else {
							return value;
						}
					}, "\t")
				} else if (val.toString !== undefined) {
					return val.toString();
				}
				else {
					return this.__value__ + "";
				}
			}
		},
		"int": {
			get: function() {
				return parseInt(this.__value__);
			}
		},
		"num": {
			get: function() {
				return parseFloat(this.__value__);
			}
		},
		"number": {
			get: function() {
				return this.__value__.to.num;
			}
		}
	});

	Object.defineProperty(Object.prototype, 'to', {
		get: function() {
			to.__value__ = this;
			return to;
		}
	})
})();

// function is(x, y){if (x === y) {return x !== 0 || 1 / x === 1 / y; } return x !== x && y !== y; }
// function isnt(x, y){return !is(x, y);}
Object.define("is", function(v1, v2) {
	if (v1 === 0 && v2 === 0) {
		return 1 / v1 === 1 / v2
	}
	if (v1 !== v1) {
		return v2 !== v2
	}
	return v1 === v2
})
Object.prototype.define("is", function(y) {
	var x = this
	if (x === y) {
		return x !== 0 || 1 / x === 1 / y
	}
	return x !== x && y !== y
})
Object.prototype.define('not', function(predicate) {
	return function() {
		return !predicate.apply(null, arguments)
	}
})
Object.prototype.define('isNot', function(predicate) {
	return function() {
		return !predicate.apply(null, arguments)
	}
})
Object.prototype.define("isnt", function(y) {
	return !this.is(y)
})
Object.prototype.define('isNull', function(obj) {
	return obj === null
})
Object.prototype.define('isUndefined', function(obj) {
	return Object.prototype.toString.call(obj) === '[object Undefined]' || obj === void 0
})
Object.prototype.define('isDefined', function(obj) {
	return Object.prototype.toString.call(obj) !== '[object Undefined]' && obj === void 0
})

Object.prototype.define('isEmpty', function() {
	if (this === null || typeof this !== 'object') {
		return !(this && this.length > 0)
	}
	return Object.prototype.keys(this).length === 0
})

Object.prototype.define('isSameType', function(obj) {
	return Object.prototype.toString.call(this) === Object.prototype.toString.call(obj)
})
Object.prototype.define('isOwnProperty', function(prop) {
	return Object.prototype.hasOwnProperty.call(this, prop)
})
Object.prototype.define('isPlainObject', function isPlainObject() {
	return (!!this && typeof this === 'object' && this.constructor === Object)
})
Object.prototype.define('isPrimitive', function isPrimitive() {
	switch (typeof this) {
		case "string":
		case "number":
		case "boolean":
			return true
	}
	return this == null
})
Object.prototype.define('isOk', function(exp) {
	var val = this
	if (typeof val === 'string') {
		return exp.test(val.trim())
	}
	else {
		return !!val
	}
})

Object.prototype.define('isType', function(type) {
	return Object.prototype.toString.call(this) === ("[object " + type + "]")
})

Object.prototype.define('isInstanceOf', function(obj, prototype) {
	if (obj.isUndefined() || obj.isNull()) {
		return false
	}
	if (prototype.isFunction() && obj instanceof prototype) {
		return true
	}
	return false
})
Object.prototype.define('isLike', function(obj, duck) {
	var name
	for (name in duck) {
		if (duck.hasOwnProperty(name)) {
			if (obj.hasOwnProperty(name) === false || typeof obj[name] !== typeof duck[name]) {
				return false
			}
			if (isObject(obj[name]) && isLike(obj[name], duck[name]) === false) {
				return false
			}
		}
	}
	return true
})

Object.prototype.define('isUnemptyString', function(obj) {
	return isString(obj) && obj !== ''
})
Object.prototype.define('isEmptyString', function(obj) {
	return isString(obj) && obj === ''
})
Object.prototype.define('isWebUrl', function(obj) {
	return isUnemptyString(obj) && /^https?:\/\/.+/.test(obj)
})
Object.prototype.define('isGitUrl', function(obj) {
	return isUnemptyString(obj) && /^git\+(ssh|https?):\/\/.+/.test(obj)
})
Object.prototype.define('isEmail', function(obj) {
	return isUnemptyString(obj) && /\S+@\S+/.test(obj)
})
Object.prototype.define('isLength', function isLength(obj, value) {
	return obj && obj.length === value
})
Object.prototype.define('isNumber', function isNumber(obj) {
	return typeof obj === 'number' && isNaN(obj) === false && obj !== Number.POSITIVE_INFINITY && obj !== Number.NEGATIVE_INFINITY
})

Object.prototype.define("isNaN", function isNaN(val) {
	return !isNumber(val) || !this.isNumber() || $isNaN(Number(val))
})

Object.prototype.define('isOdd', function isOdd(obj) {
	return isNumber(obj) && (obj % 2 === 1 || obj % 2 === -1)
})
Object.prototype.define('isEven', function isEven(obj) {
	return isNumber(obj) && obj % 2 === 0
})
Object.prototype.define('isInteger', function isInteger(obj) {
	return isNumber(obj) && obj % 1 === 0
})
Object.prototype.define('isFloat', function isFloat(obj) {
	return isNumber(obj) && obj % 1 !== 0
})
Object.prototype.define('isPositive', function isPositive(obj) {
	return isNumber(obj) && obj > 0
})
Object.prototype.define('isNegative', function isNegative(obj) {
	return isNumber(obj) && obj < 0
})

Object.prototype.define('isFinite', function isFinite(val) {
	var is = false
	if (typeof val === 'string' && val !== '') {
		is = isFinite(parseFloat(val))
	} else if (this.isNumber(val)) {
		is = isFinite(val)
	}
	return is
})



function isObject(object) {
	var type = typeof object
	return type === 'function' || type === 'object' && !!object
}


function isArray(obj) {
	return obj.toString() === '[object Array]'
}

function isString(obj) {
	return obj.toString() === '[object String]'
}

function isNumber(value) {
	return !isNaN(Number(value))
}

function isBoolean(value) {
	return value === false || value === true
}

function isNull(value) {
	return value == null
}

function isRegExp(re) {
	var s
	try {
		s = '' + re
	}
	catch (e) {
		return false
	}
	return re instanceof RegExp ||
		typeof(re) === 'function' &&
		re.constructor.name === 'RegExp' &&
		re.compile &&
		re.test &&
		re.exec &&
		s.match(/^\/.*\/[gim]{0,3}$/)
}

function isDate(d) {
	return d instanceof Date
}

function isUndefinedOrNull(value) {
	return value === null || value === undefined
}

function isArguments(obj) {
	return obj.toString() == '[object Arguments]'
}

['Array', 'Boolean', 'Date', 'Function', 'Number', 'String', 'RegExp'].each(function(type) {
	return Object.prototype.define("is" + type, function() {
		return this.toString() === ("[object " + type + "]")
	})
})