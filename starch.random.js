
var rand = function(min, max, round, mt) {
    if (arguments.length === 0) {
        return Math.random();
    }
    if (!round) {
        round = 1;
    }
    if (!max) {
        var max = min;
        min = 1;
    }
    if (max.isString()) {
        max = max.charCodeAt(0);
        min = min.charCodeAt(0);
        return String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    if (mt) {
        min = parseInt(min, 10);
        max = parseInt(max, 10);
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


Math.rand = function(min, max, round, mt) {
    return function() {
        return rand(min, max, round, mt)
    }
}
Math.rand(6, 9).repeat(3)
Math.rand("A", "Z").repeat(3)

var Random = function Random() {
  // return function() {
  //   return Math.random();
  // }
}
var nativeRandom = Math.random;
Math.random = function(min, max, round, mt) {
  if (arguments.length === 0) {
    return nativeRandom();
  }
  if (!round) {
    round = 1;
  }
  if (!max) {
    var max = min;
    min = 1;
  }
  if (mt) {
    min = parseInt(min, 10);
    max = parseInt(max, 10);
  }
  return Math.floor(nativeRandom() * (max - min + 1)) + min;
}
Random.prototype.boolean = function() {
  return Math.random() >= 0.5;
}
Random.prototype.min = function() {
  return 0;
}
Random.prototype.max = function() {
  return 2147483647;
}
Random.prototype.between = function(low, high, digits) {
  var d = (typeof digits === 'number' && digits > 0 ? digits : 0),
    floor = +low,
    range = +(high - low),
    random = Math.random() * range + floor;
  return random.toFixed(d);
};
Random.prototype.within = function(range) {
  return Math.floor(range[0] + Math.random() * (range[1] + 1 - range[0]));
}
Random.prototype.normal = function(mean, stdDev) {
  var u, v, s;
  mean = mean || 0;
  stdDev = stdDev || 1;
  do {
    u = Math.random() * 2 - 1;
    v = Math.random() * 2 - 1;
    s = u * u + v * v;
  } while (s >= 1 || s === 0);
  return mean + stdDev * u * Math.sqrt(-2 * Math.log(s) / s);
};
Random.prototype.bool = function() {
  return Math.random() >= 0.5;
}
Random.prototype.boolean = function() {
  return Math.random() >= 0.5;
}
Random.prototype.bit = function() {
  return this.bool() ? 1 : 0;
}
Random.prototype.sign = function() {
  return this.bool() ? 1 : -1;
}
Random.prototype.index = function(arr) {
  return this.integer(0, arr.length - 1);
}
Random.prototype.float = function(min, max) {
  min = min == null ? MIN_INT : min;
  max = max == null ? MAX_INT : max;
  return min + (max - min) * Math.random();
}
Random.prototype.integer = function(min, max) {
  min = min == null ? MIN_INT : ~~min;
  max = max == null ? MAX_INT : ~~max;
  return Math.round(rand(min - 0.5, max + 0.499999999999));
}
Random.prototype.string = function(length, charSet) {
  var result = [];
  length = length || 16;
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  while (length--) {
    result.push(charSet[Math.floor(Math.random() * charSet.length)]);
  }
  return result.join('');
}
Random.prototype.color = function() {
  return new Color({
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255)
  });
}
Random.prototype.choice = function(str) {
  return str[this.between(0, str.length)]
}
Random.prototype.hex = function(size) {
  var _chars = '0123456789abcdef'.split('');
  size = size && size > 0 ? size : 6;
  var str = '';
  while (size--) {
    str += this.choice(_chars);
  }
  return str;
}
Random.prototype.guid = function() {
  var result =
    this.hex(8) +
    '-' +
    this.hex(4) +
    '-' +
    '4' +
    this.hex(3) +
    '-' +
    choice(8, 9, 'a', 'b') +
    this.hex(3) +
    '-' +
    this.hex(12);
  return result;
}
Random.prototype.word = function(n) {
  var result = [];
  for (var i = 0; i < n; i++) {
    result.push(word_list[Math.random(0, word_list.length)]);
  }
  return result;
}
Random.prototype.chance = function(d, n) {
  var n = n || 1;
  return Math.floor(Math.random() * d + 1) * n === d;
}
Random.prototype.color = function() {
  return "#" + this.hex(6)
}
Random.prototype.deterministic = (function() {
  var seed = 0x2F6E2B1;
  return function() {
    // Robert Jenkins’ 32 bit integer hash function
    seed = ((seed + 0x7ED55D16) + (seed << 12))  & 0xFFFFFFFF;
    seed = ((seed ^ 0xC761C23C) ^ (seed >>> 19)) & 0xFFFFFFFF;
    seed = ((seed + 0x165667B1) + (seed << 5))   & 0xFFFFFFFF;
    seed = ((seed + 0xD3A2646C) ^ (seed << 9))   & 0xFFFFFFFF;
    seed = ((seed + 0xFD7046C5) + (seed << 3))   & 0xFFFFFFFF;
    seed = ((seed ^ 0xB55A4F09) ^ (seed >>> 16)) & 0xFFFFFFFF;
    return (seed & 0xFFFFFFF) / 0x10000000;
  };
}());




// var randomProperty = function (obj) {
//   var keys = Object.keys(obj)
//   return obj[keys[keys.length * Math.random() << 0]];
// };
Object.prototype.define("pick", function() {
  var keys = Object.keys();
  return this[keys[Math.floor((Math.random() * keys.length))]];
})
jQuery.fn.define("pick", function() {
  return $(this).eq(Math.random(0, $(this).length - 1))
})




Array.prototype.define("pick", function() {
  return this[Math.floor((Math.random() * this.length))];
})


Array.prototype.define("randomize", function () {
  return this.sort(function(){return(Math.round(Math.random())-0.5)});
})

Array.prototype.define("shuffle", function () {
  var i = this.length, j, temp
  if (i == 0) {
    return
  }
  while (--i) {
    j = Math.floor(Math.random() * (i + 1))
    temp = this[i]
    this[i] = this[j]
    this[j] = temp
  }
  return this
})





Array.prototype.define("randomSlice", function randomSlice(num) {
  var arr = this;
  if (!num || num >= arr.length) {
    return arr.slice();
  }
  var index = Math.floor(Math.random() * arr.length);
  var a = [];
  for (var i = 0, j = index; i < num; i++) {
    a.push(arr[j++]);
    if (j === arr.length) {
      j = 0;
    }
  }
  return a;
})

Array.prototype.define("sample", function (n, range) {
  var arr = this;
  var ary, idx, len, ridx, tmp;
  if (range == null) {
    range = void 0;
  }
  len = arr.length;
  if (n === void 0) {
    return arr[__rand(len)];
  }
  n = __int(n);
  if (n < 0) {
    _err.throw_argument();
  }
  if (n > len) {
    n = len;
  }
  ary = arr.slice(0);
  idx = -1;
  while (++idx < n) {
    ridx = idx + __rand(len - idx);
    tmp = ary[idx];
    ary[idx] = ary[ridx];
    ary[ridx] = tmp;
  }
  return ary.slice(0, n);
})




//create a delabriandais tree for random words
