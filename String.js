
String.prototype.define('parse', function(reviver) {
  return JSON.parse(this, reviver);
})


String.define("random", function(len) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text
})
String.define("format", function(format) {
  var args = Array.prototype.slice.call(arguments, 1)
  return format.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined' ? args[number] : match
  })
})
String.prototype.define("format", function() {
  var args = arguments
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined' ? args[number] : match
  })
})
String.prototype.define("extension", function() {
  return String(this).substring(String(this).length - 3, String(this).length)
})
String.prototype.define("is_range", function() {
  return String(this).search(/\w\d:\w\d/) != -1
})
String.prototype.define("is_col", function() {
  return String(this).search(/\w/) != -1
})
String.prototype.define("is_col_range", function() {
  return String(this).search(/\w:\w/) != -1
})
String.prototype.define("is_row", function() {
  return String(this).search(/\d/) != -1
})
String.prototype.define("is_row_range", function() {
  return String(this).search(/\d:\d/) != -1
})
String.prototype.define("is_number", function() {
  return String(this).search(/^\s*(\+|-)?\d+\s*$/) != -1
})
String.prototype.define("isnt_blank", function() {
  return String(this).search(/\S/) != -1
})
String.prototype.define("is_decimal", function() {
  return String(this).search(/^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/) != -1
})
String.prototype.define("is_email", function() {
  return String(this).search(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/) != -1
})
String.prototype.define("get_digits", function() {
  return String(this).replace(/[^\d]/g, "")
})
String.prototype.define("is_number", function() {
  return String(this).search(/^\s*(\+|-)?\d+\s*$/) != -1
})
String.prototype.define("is_url", function() {
  return /(http:\/\/)?(www\.)?(.+?)(\.com|\.org|\.gov|\.edu)(\/.*?)?/.test(this)
})
String.prototype.define("strip", function() {
  return String(this).replace(new RegExp('</?.+?>', 'g'), '')
})
String.prototype.define("isInteger", function() {
  return /^-?\d+$/.test(this)
})
String.prototype.define("isPositiveDecimal", function() {
  return (!/\D/.test(this)) || (/^\d+\.\d+$/.test(this))
})
String.prototype.define("isAlphanumeric", function() {
  return !(/\W/.test(this))
})
String.prototype.define("validEmail", function() {
  return String(this).match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) === null
})
String.prototype.define("checkMail", function() {
  return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this)
})
String.prototype.define("onlyLetters", function() {
  return String(this).toLowerCase().replace(/[^a-z]/g, "")
})
String.prototype.define("onlyLettersNums", function() {
  return String(this).toLowerCase().replace(/[^a-z,0-9,-]/g, "")
})
String.prototype.define("trim", function() {
  return String(this).replace(/^\s+|\s+$/g, '')
})
String.prototype.define("ltrim", function() {
  return String(this).replace(/^\s+/, '')
})
String.prototype.define("rtrim", function() {
  return String(this).replace(/\s+$/, '')
})
String.prototype.define("ftrim", function() {
  return String(this).replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ')
})
String.prototype.define("prefixArticle", function() {
  var result = (['a', 'e', 'i', 'o', 'u'].indexOf(this[0]) > -1) ? "an "+this : return "a "+this;
  return result
})
String.prototype.define("encode", function(str) {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var encoded = [];
  var c = 0;
  while (c < str.length) {
      var b0 = str.charCodeAt(c++);
      var b1 = str.charCodeAt(c++);
      var b2 = str.charCodeAt(c++);
      var buf = (b0 << 16) + ((b1 || 0) << 8) + (b2 || 0);
      var i0 = (buf & (63 << 18)) >> 18;
      var i1 = (buf & (63 << 12)) >> 12;
      var i2 = isNaN(b1) ? 64 : (buf & (63 << 6)) >> 6;
      var i3 = isNaN(b2) ? 64 : (buf & 63);
      encoded[encoded.length] = chars.charAt(i0);
      encoded[encoded.length] = chars.charAt(i1);
      encoded[encoded.length] = chars.charAt(i2);
      encoded[encoded.length] = chars.charAt(i3);
  }
  return encoded.join('');
})
String.prototype.define("decode", function(str) {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var invalid = {
      strlen: (str.length % 4 != 0),
      chars:  new RegExp('[^' + chars + ']').test(str),
      equals: (/=/.test(str) && (/=[^=]/.test(str) || /={3}/.test(str)))
  };
  if (invalid.strlen || invalid.chars || invalid.equals)
      throw new Error('Invalid base64 data');
  var decoded = [];
  var c = 0;
  while (c < str.length) {
      var i0 = chars.indexOf(str.charAt(c++));
      var i1 = chars.indexOf(str.charAt(c++));
      var i2 = chars.indexOf(str.charAt(c++));
      var i3 = chars.indexOf(str.charAt(c++));
      var buf = (i0 << 18) + (i1 << 12) + ((i2 & 63) << 6) + (i3 & 63);
      var b0 = (buf & (255 << 16)) >> 16;
      var b1 = (i2 == 64) ? -1 : (buf & (255 << 8)) >> 8;
      var b2 = (i3 == 64) ? -1 : (buf & 255);
      decoded[decoded.length] = String.fromCharCode(b0);
      if (b1 >= 0) decoded[decoded.length] = String.fromCharCode(b1);
      if (b2 >= 0) decoded[decoded.length] = String.fromCharCode(b2);
  }
  return decoded.join('');
})
String.prototype.define("replaceAt", function(index, character) {
  return this.substr(0, index) + character + this.substr(index + character.length)
})
String.prototype.define("swap", function(i1, i2) {
  var temp = this[i1]
  return this.replaceAt(i1, this[i2]).replaceAt(i2, temp)
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
String.prototype.define("replaceAt", function(index, character) {
  return this.substr(0, index) + character + this.substr(index + character.length)
})
String.prototype.define("swap", function(i1, i2) {
  var temp = this[i1]
  return this.replaceAt(i1, this[i2]).replaceAt(i2, temp)
})
String.prototype.define("remove", function(a) {
  return this.replace(a, '')
})
String.prototype.__defineGetter__('base64Encode', function(){
  return String.prototype.encode(this)
})
String.prototype.__defineGetter__('base64Decode', function(){
  return String.prototype.decode(this)
})