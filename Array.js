

Array.prototype.sort		= function() 	{var tmp; for(var i = 0; i < this.length; i++) {for(var j = 0; j < this.length; j++) {if(this[i] < this[j]) {tmp = this[i]; this[i] = this[j]; this[j] = tmp}}}}
Array.prototype.shuffle	 	= function() 	{var i = this.length, j, t; while(i--) {j = Math.floor((i + 1) * Math.random()); t = arr[i]; arr[i] = arr[j]; arr[j] = t}}
Array.prototype.unshift	 	= function(el)	{this[this.length] = null; for(var i = 1; i < this.length; i++) {this[i] = this[i-1]}; this[0] = el; return this.length}
Array.prototype.shift	 	= function() 	{var result = this[0]; for(var i = 1; i < this.length; i++) {this[i-1] = this[i]}; this.length = this.length-1; return result}
Array.prototype.clear	 	= function() 	{this.length = 0}
Array.prototype.unique		= function() 	{var a = [],i; this.sort(); for(i = 0; i < this.length; i++) {if(this[i] !== this[i + 1]) {a[a.length] = this[i]}}; return a}
Array.prototype.lastIndexOf = function(n)	{var i = this.length; while(i--) {if(this[i] === n) {return i}}; return -1}
Array.prototype.contains	= function(el) 	{for (var i = 0; i < this.length; i++) {if (this[i] == el) {return true}}; return false}
Array.prototype.remove		= function(el) 	{var i = 0; while (i < this.length) {if (this[i] == el) {this.splice(i, 1)}; else {i++}}}
Array.prototype.inArray		= function(val) {for (var i = 0; i < this.length; i++) {if (this[i] === val) {return true}}; return false}
Array.prototype.append		= function(el) 	{this.push(el); return this.length}
Array.prototype.chunk 		= function(arr, n) {var result = [] for (i = 0; i < arr.length; i += n) {result.push(arr.slice(i, i+n)) } return result }
Array.prototype.sum 		= function()	{var sum = 0; for (i in this) {sum += parseInt(this[i])}; return sum}
Array.prototype.ave 		= function() 	{return this.sum()/this.length}
Array.prototype.dev = function()
{
	var mean = comp_ave(this)
	var dev = 0
	for (i in this) {this[i] = (this[i] - mean)}
	for (i in this) {this[i] = (this[i] * this[i])}
	for (i in this) {dev += this[i]}
	dev /= (this.length-1)
	dev = Math.sqrt(dev)
	return dev
}