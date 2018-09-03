Array.define("fill", function(n) {
	return Array.apply(null, Array(n)).map(function(_, i) {
		return i
	})
})
Array.prototype.define("each", Array.prototype.forEach)
Array.prototype.define('remove', function(obj) {
	var i = this.indexOf(obj)
	if (~i) {
		return this.splice(i, 1)[0]
	}
	else {
		return false
	}
})
Array.prototype.define('removeAll', function(obj) {
	var removed = []
	while (true) {
		var i = this.indexOf(obj)
		if (~i) {
			removed[removed.length] = this.splice(i, 1)
		}
		else {
			break
		}
	}
	return removed
})
Array.prototype.define('contains', function(obj) {
	var i = this.indexOf(obj)
	return !!~i;
})
Array.prototype.define('toString', function() {
	return this.join(", ")
})
Array.prototype.define("pick", function() {
	return this[Math.floor((Math.random() * this.length))];
})
Array.prototype.define("randomize", function() {
	return this.sort(function() {
		return (Math.round(Math.random()) - 0.5)
	});
})
Array.prototype.define("shuffle", function() {
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
Array.prototype.define("randomSlice", function(num) {
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
Array.prototype.define("sample", function(n, range) {
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
Array.prototype.define("flatten", function(ret) {
	var arr = this,
		ret = ret || [],
		len = arr.length
	for (var i = 0; i < len; ++i) {
		if (Array.isArray(arr[i])) {
			arr[i].flatten(ret)
		}
		else {
			ret.push(arr[i])
		}
	}
	return ret
})
Array.prototype.define("first", function() {
	if (arguments.length > 0) {
		this[0] = arguments[0]
	}
	return this[0]
})
Array.prototype.define("start", function() {
	return 0
})
Array.prototype.define("end", function() {
	return this.length - 1
})
Array.prototype.define("last", function() {
	if (arguments.length > 0) {
		this[this.length - 1] = arguments[0]
	}
	return this[this.length - 1]
})
Array.prototype.define("sort", function() {
	var tmp;
	for (var i = 0; i < this.length; i++) {
		for (var j = 0; j < this.length; j++) {
			if (this[i] < this[j]) {
				tmp = this[i];
				this[i] = this[j];
				this[j] = tmp
			}
		}
	}
})
Array.prototype.define("shuffle", function() {
	var i = this.length, j, t;
	while (i--) {
		j = Math.floor((i + 1) * Math.random());
		t = arr[i];
		arr[i] = arr[j];
		arr[j] = t
	}
})
Array.prototype.define("unshift", function(el) {
	this[this.length] = null;
	for (var i = 1; i < this.length; i++) {
		this[i] = this[i - 1]
	};
	this[0] = el;
	return this.length
})
Array.prototype.define("shift", function() {
	var result = this[0];
	for (var i = 1; i < this.length; i++) {
		this[i - 1] = this[i]
	};
	this.length = this.length - 1;
	return result
})
Array.prototype.define("clear", function() {
	this.length = 0
})
Array.prototype.define("unique", function() {
	var a = [], i;
	this.sort();
	for (i = 0; i < this.length; i++) {
		if (this[i] !== this[i + 1]) {
			a[a.length] = this[i]
		}
	};
	return a
})
Array.prototype.define("lastIndexOf", function(n) {
	var i = this.length;
	while (i--) {
		if (this[i] === n) {
			return i
		}
	};
	return -1
})
Array.prototype.define("contains", function(el) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == el) {
			return true
		}
	};
	return false
})
Array.prototype.define("remove", function(el) {
	var i = 0;
	while (i < this.length) {
		if (this[i] == el) {
			this.splice(i, 1)
		}
		else {
			i++
		}
	}
})
Array.prototype.define("inArray", function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] === val) {
			return true
		}
	};
	return false
})
Array.prototype.define("append", function(el) {
	this.push(el);
	return this.length
})
Array.prototype.define("chunk", function(arr, n) {
	var result = []
	for (i = 0; i < arr.length; i += n) {
		result.push(arr.slice(i, i + n))
	}
	return result
})
Array.prototype.define("sum", function() {
	var sum = 0;
	for (i in this) {
		sum += parseInt(this[i])
	};
	return sum
})
Array.prototype.define("ave", function() {
	return this.sum() / this.length
})
Array.prototype.define("dev", function() {
	var mean = comp_ave(this)
	var dev = 0
	for (i in this) {
		this[i] = (this[i] - mean)
	}
	for (i in this) {
		this[i] = (this[i] * this[i])
	}
	for (i in this) {
		dev += this[i]
	}
	dev /= (this.length - 1)
	dev = Math.sqrt(dev)
	return dev
})
Array.prototype.define("clear", function() {
	this.length = 0
})
Array.prototype.define("unique", function() {
	var a = [], i;
	this.sort();
	for (i = 0; i < this.length; i++) {
		if (this[i] !== this[i + 1]) {
			a[a.length] = this[i]
		}
	};
	return a
})
Array.prototype.define("lastIndexOf", function(n) {
	var i = this.length;
	while (i--) {
		if (this[i] === n) {
			return i
		}
	};
	return -1
})
Array.prototype.define("contains", function(el) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == el) {
			return true
		}
	};
	return false
})