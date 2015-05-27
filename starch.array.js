
Array.prototype.define("flatten", function(ret){
  var arr = this, ret = ret || [], len = arr.length
  for (var i = 0; i < len; ++i) {
    if (Array.isArray(arr[i])) {
      arr[i].flatten(ret)
    } else {
      ret.push(arr[i])
    }
  }
  return ret
})
Array.prototype.define("first", function() {
  return this[0]
})
Array.prototype.define("start", function() {
  return 0
})
Array.prototype.define("end", function() {
  return this.length - 1
})
Array.prototype.define("last", function() {
  return this[this.length - 1]
})
Array.prototype.define("each", Array.prototype.forEach)
Array.define("fill", function(n) {
  return Array.apply(null, Array(n)).map(function (_, i) {
    return i
  })
})
