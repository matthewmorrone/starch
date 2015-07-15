


function isArray(obj) {
  return obj.toString() === '[object Array]'
}
function isString(obj) {
  return obj.toString()=== '[object String]'
}
function isObject(obj) {
  return obj.toString()=== '[object Object]'
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
  } catch (e) {
    return false
  }
  return re instanceof RegExp ||
  typeof (re) === 'function' &&
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


Object.prototype.isString = function() {
    return typeof this.constructor() === "string";
}

['Array', 'Boolean', 'Date', 'Function', 'Number', 'String', 'RegExp'].each(function(type) {
  return Object.prototype.define("is" + type, function() {
    return this.toString() === ("[object " + type + "]")
  })
})
Object.prototype.type = function() {
  Object.prototype.toString.call(this).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
}
Object.prototype.define("type", function() {
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
Object.prototype.define("is", function (y) {
  var x = this
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y
  }
  return x !== x && y !== y
})
Object.prototype.define('not', function (predicate) {
  return function () {
    return !predicate.apply(null, arguments)
  }
})
Object.prototype.define('isNot', function (predicate) {
  return function () {
    return !predicate.apply(null, arguments)
  }
})
Object.prototype.define("isnt", function (y) {
  return !this.is(y)
})
Object.prototype.define('isNull', function (obj) {
  return obj === null
})
Object.prototype.define('isUndefined', function (obj) {
  return Object.prototype.toString.call(obj) === '[object Undefined]' || obj === void 0
})
Object.prototype.define('isDefined', function (obj) {
  return Object.prototype.toString.call(obj) !== '[object Undefined]' && obj === void 0
})



Object.prototype.define('isEmpty', function () {
  if (this === null || typeof this !== 'object') {
    return !(this && this.length > 0)
  }
  return Object.prototype.keys(this).length === 0
})

Object.prototype.define('isSameType', function (obj) {
  return Object.prototype.toString.call(this) === Object.prototype.toString.call(obj)
})
Object.prototype.define('isOwnProperty', function (prop) {
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
Object.prototype.define('isOk', function (exp) {
  var val = this
  if (typeof val === 'string') {
    return exp.test(val.trim())
  } else {
    return !!val
  }
})

Object.prototype.define('isType', function (type) {
  return Object.prototype.toString.call(this) === ("[object " + type + "]")
})

Object.prototype.define('isInstanceOf', function (obj, prototype) {
  if (obj.isUndefined() || obj.isNull()) {
    return false
  }
  if (prototype.isFunction() && obj instanceof prototype) {
    return true
  }
  return false
})
Object.prototype.define('isLike', function (obj, duck) {
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






Object.prototype.define('isUnemptyString', function (obj) {
  return isString(obj) && obj !== ''
})
Object.prototype.define('isEmptyString', function (obj) {
  return isString(obj) && obj === ''
})
Object.prototype.define('isWebUrl', function (obj) {
  return isUnemptyString(obj) && /^https?:\/\/.+/.test(obj)
})
Object.prototype.define('isGitUrl', function (obj) {
  return isUnemptyString(obj) && /^git\+(ssh|https?):\/\/.+/.test(obj)
})
Object.prototype.define('isEmail', function (obj) {
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

Number.prototype.define('isOdd', function isOdd(obj) {
  return (obj % 2 === 1 || obj % 2 === -1)
})
Number.prototype.define('isEven', function isEven(obj) {
  return obj % 2 === 0
})
Number.prototype.define('isInteger', function isInteger(obj) {
  return obj % 1 === 0
})
Number.prototype.define('isFloat', function isFloat(obj) {
  return obj % 1 !== 0
})
Number.prototype.define('isPositive', function isPositive(obj) {
  return obj > 0
})
Number.prototype.define('isNegative', function isNegative(obj) {
  return obj < 0
})
Number.prototype.define("isMultipleOf", function isMultipleOf(multiple) {
  return this % multiple === 0
})
Number.prototype.define("isLuhn", function isLuhn(num) {
  num = (num + '').split('').reverse()
  var sum = 0,
  i, digit
  for (i = 0; i < num.length; i++) {
    digit = parseInt(num[i], 10) * ((i + 1) % 2 ? 1 : 2)
    sum += digit > 9 ? digit - 9 : digit
  }
  return (sum % 10) === 0
})

Object.prototype.define('isObject', function (obj, strict) {
  if (strict) {
    return typeof obj === 'object' && !isNull(obj) && !isArray(obj) && !isDate(obj)
  }
  return Object.prototype.toString.call(obj) === '[object Object]' && obj !== void 0
})
