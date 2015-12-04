
String.prototype.extension 			= function() {return String(this).substring(String(this).length-3, String(this).length)}
String.prototype.is_range			= function() {return String(this).search(/\w\d:\w\d/) != -1}
String.prototype.is_col				= function() {return String(this).search(/\w/) != -1}
String.prototype.is_col_range		= function() {return String(this).search(/\w:\w/) != -1}
String.prototype.is_row				= function() {return String(this).search(/\d/) != -1}
String.prototype.is_row_range		= function() {return String(this).search(/\d:\d/) != -1}
String.prototype.is_number			= function() {return String(this).search(/^\s*(\+|-)?\d+\s*$/) != -1}
String.prototype.isnt_blank			= function() {return String(this).search(/\S/) != -1}
String.prototype.is_decimal			= function() {return String(this).search(/^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/) != -1}
String.prototype.is_email			= function() {return String(this).search(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/) != -1}
String.prototype.get_digits			= function() {return String(this).replace(/[^\d]/g, "")}
String.prototype.is_number			= function() {return String(this).search(/^\s*(\+|-)?\d+\s*$/) != -1}
String.prototype.is_url				= function() {return /(http:\/\/)?(www\.)?(.+?)(\.com|\.org|\.gov|\.edu)(\/.*?)?/.test(this)}
String.prototype.strip				= function() {return String(this).replace(new RegExp('</?.+?>', 'g'), '') }
String.prototype.isInteger			= function() {return /^-?\d+$/.test(this)}
String.prototype.isPositiveDecimal 	= function() {return (!/\D/.test(this)) || (/^\d+\.\d+$/.test(this))}
String.prototype.isAlphanumeric		= function() {return !(/\W/.test(this))}
String.prototype.validEmail			= function() {return String(this).match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) ===null}
String.prototype.checkMail			= function() {return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this)}
String.prototype.onlyLetters	 	= function() {return String(this).toLowerCase().replace(/[^a-z]/g, "") }
String.prototype.onlyLettersNums 	= function() {return String(this).toLowerCase().replace(/[^a-z,0-9,-]/g, "")}
String.prototype.trim				= function() {return String(this).replace(/^\s+|\s+$/g, '')}
String.prototype.ltrim				= function() {return String(this).replace(/^\s+/,'')}
String.prototype.rtrim				= function() {return this.replace(/\s+$/,'')}
String.prototype.ftrim				= function() {return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ')}
String.prototype.prefixArticle	 	= function() {var result = (['a', 'e', 'i', 'o', 'u'].indexOf(this[0]) > -1) ? "an "+this : return "a "+this; return result}
