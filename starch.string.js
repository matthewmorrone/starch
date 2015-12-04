
String.prototype.define("replaceAt", function(index, character) {
  return this.substr(0, index) + character + this.substr(index+character.length)
})
String.prototype.define("swap", function(i1, i2) {
  var temp = this[i1]
  return this.replaceAt(i1, this[i2]).replaceAt(i2, temp)
})
String.define("format", function(format) {
  var args = Array.prototype.slice.call(arguments, 1)
  return format.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined' ? args[number] : match
  })
})
String.prototype.define("format", function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined' ? args[number] : match
  })
})
String.prototype.define("pad", function(n, char) {
  return (new Array(++n - this.length)).join(char || '0') + this
})
String.prototype.define("padLeft", String.prototype.pad).define("padRight", function(n, char) {
  return this + (new Array(++n - this.length)).join(char || '0')
})
String.prototype.define("replaceAll", function(a, b) {
  return this.split(a).join(b)
})
String.prototype.define("trim", function() {
  return this.replace(/^\s+|\s+$/g, '')
})
