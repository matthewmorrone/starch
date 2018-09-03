Date.define("getMonthNumberFromName", function(name) {
	var n = Date.CultureInfo.monthNames,
		m = Date.CultureInfo.abbreviatedMonthNames,
		s = name.toLowerCase();
	for (var i = 0; i < n.length; i++) {
		if (n[i].toLowerCase() == s || m[i].toLowerCase() == s) {
			return i;
		}
	}
	return -1;
})
Date.define("getDayNumberFromName", function(name) {
	var n = Date.CultureInfo.dayNames,
		m = Date.CultureInfo.abbreviatedDayNames,
		o = Date.CultureInfo.shortestDayNames,
		s = name.toLowerCase();
	for (var i = 0; i < n.length; i++) {
		if (n[i].toLowerCase() == s || m[i].toLowerCase() == s) {
			return i;
		}
	}
	return -1;
})
Date.define("isLeapYear", function(year) {

	return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
})
Date.define("getDaysInMonth", function(year, month) {

	return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
})
Date.define("getTimezoneOffset", function(s, dst) {
	return (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST[s.toUpperCase()] : Date.CultureInfo.abbreviatedTimeZoneStandard[s.toUpperCase()];
})
Date.define("getTimezoneAbbreviation", function(offset, dst) {
	var n = (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST : Date.CultureInfo.abbreviatedTimeZoneStandard,
		p;
	for (p in n) {
		if (n[p] === offset) {
			return p;
		}
	}
	return null;
})
Date.define("now", function() {
	return new Date();
})
Date.define("today", function() {
	return Date.now().clearTime();
})
Date.define("getParseFunction", function(fx) {
	var fn = Date.Grammar.formats(fx);
	return function(s) {
		var r = null;
		try {
			r = fn.call({}, s);
		} catch (e) {
			return null;
		}
		return ((r[1].length === 0) ? r[0] : null);
	};
})
Date.define("parseExact", function(s, fx) {
	return Date.getParseFunction(fx)(s);
})
Date.define("_validate", function(value, min, max, name) {
	if (typeof value != "number") {
		throw new TypeError(value + " is not a Number.");
	} else if (value < min || value > max) {
		throw new RangeError(value + " is not a valid value for " + name + ".");
	}
	return true;
})
Date.define("validateMillisecond", function(n) {
	return Date._validate(n, 0, 999, "milliseconds");
})
Date.define("validateSecond", function(n) {
	return Date._validate(n, 0, 59, "seconds");
})
Date.define("validateMinute", function(n) {
	return Date._validate(n, 0, 59, "minutes");
})
Date.define("validateHour", function(n) {
	return Date._validate(n, 0, 23, "hours");
})
Date.define("validateDay", function(n, year, month) {
	return Date._validate(n, 1, Date.getDaysInMonth(year, month), "days");
})
Date.define("validateMonth", function(n) {
	return Date._validate(n, 0, 11, "months");
})
Date.define("validateYear", function(n) {
	return Date._validate(n, 1, 9999, "seconds");
})




Date.prototype.define("clone", function() {
	return new Date(this.getTime());
}
Date.prototype.define("compareTo", function(date) {
	if (isNaN(this)) {
		throw new Error(this);
	}
	if (date instanceof Date && !isNaN(date)) {
		return (this > date) ? 1 : (this < date) ? -1 : 0;
	} else {
		throw new TypeError(date);
	}
}
Date.prototype.define("equals", function(date) {
	return (this.compareTo(date) === 0);
}
Date.prototype.define("between", function(start, end) {
	var t = this.getTime();
	return t >= start.getTime() && t <= end.getTime();
}
Date.prototype.define("addMilliseconds", function(value) {
	this.setMilliseconds(this.getMilliseconds() + value);
	return this;
}
Date.prototype.define("addSeconds", function(value) {
	return this.addMilliseconds(value * 1000);
}
Date.prototype.define("addMinutes", function(value) {
	return this.addMilliseconds(value * 60000);
}
Date.prototype.define("addHours", function(value) {
	return this.addMilliseconds(value * 3600000);
}
Date.prototype.define("addDays", function(value) {
	return this.addMilliseconds(value * 86400000);
}
Date.prototype.define("addWeeks", function(value) {
	return this.addMilliseconds(value * 604800000);
}
Date.prototype.define("addMonths", function(value) {
	var n = this.getDate();
	this.setDate(1);
	this.setMonth(this.getMonth() + value);
	this.setDate(Math.min(n, this.getDaysInMonth()));
	return this;
}
Date.prototype.define("addYears", function(value) {
	return this.addMonths(value * 12);
}
Date.prototype.define("add", function(config) {
	if (typeof config == "number") {
		this._orient = config;
		return this;
	}
	var x = config;
	if (x.millisecond || x.milliseconds) {
		this.addMilliseconds(x.millisecond || x.milliseconds);
	}
	if (x.second || x.seconds) {
		this.addSeconds(x.second || x.seconds);
	}
	if (x.minute || x.minutes) {
		this.addMinutes(x.minute || x.minutes);
	}
	if (x.hour || x.hours) {
		this.addHours(x.hour || x.hours);
	}
	if (x.month || x.months) {
		this.addMonths(x.month || x.months);
	}
	if (x.year || x.years) {
		this.addYears(x.year || x.years);
	}
	if (x.day || x.days) {
		this.addDays(x.day || x.days);
	}
	return this;
}
Date.prototype.define("set", function(config) {
	var x = config;
	if (!x.millisecond && x.millisecond !== 0) {
		x.millisecond = -1;
	}
	if (!x.second && x.second !== 0) {
		x.second = -1;
	}
	if (!x.minute && x.minute !== 0) {
		x.minute = -1;
	}
	if (!x.hour && x.hour !== 0) {
		x.hour = -1;
	}
	if (!x.day && x.day !== 0) {
		x.day = -1;
	}
	if (!x.month && x.month !== 0) {
		x.month = -1;
	}
	if (!x.year && x.year !== 0) {
		x.year = -1;
	}
	if (x.millisecond != -1 && Date.validateMillisecond(x.millisecond)) {
		this.addMilliseconds(x.millisecond - this.getMilliseconds());
	}
	if (x.second != -1 && Date.validateSecond(x.second)) {
		this.addSeconds(x.second - this.getSeconds());
	}
	if (x.minute != -1 && Date.validateMinute(x.minute)) {
		this.addMinutes(x.minute - this.getMinutes());
	}
	if (x.hour != -1 && Date.validateHour(x.hour)) {
		this.addHours(x.hour - this.getHours());
	}
	if (x.month !== -1 && Date.validateMonth(x.month)) {
		this.addMonths(x.month - this.getMonth());
	}
	if (x.year != -1 && Date.validateYear(x.year)) {
		this.addYears(x.year - this.getFullYear());
	}
	if (x.day != -1 && Date.validateDay(x.day, this.getFullYear(), this.getMonth())) {
		this.addDays(x.day - this.getDate());
	}
	if (x.timezone) {
		this.setTimezone(x.timezone);
	}
	if (x.timezoneOffset) {
		this.setTimezoneOffset(x.timezoneOffset);
	}
	return this;
}
Date.prototype.define("clearTime", function() {
	this.setHours(0);
	this.setMinutes(0);
	this.setSeconds(0);
	this.setMilliseconds(0);
	return this;
}
Date.prototype.define("isLeapYear", function() {
	var y = this.getFullYear();
	return (((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0));
}
Date.prototype.define("isWeekday", function() {
	return !(this.is().sat() || this.is().sun());
}
Date.prototype.define("getDaysInMonth", function() {
	return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
}
Date.prototype.define("moveToFirstDayOfMonth", function() {
	return this.set({
		day: 1
	});
}
Date.prototype.define("moveToLastDayOfMonth", function() {
	return this.set({
		day: this.getDaysInMonth()
	});
}
Date.prototype.define("moveToDayOfWeek", function(day, orient) {
	var diff = (day - this.getDay() + 7 * (orient || +1)) % 7;
	return this.addDays((diff === 0) ? diff += 7 * (orient || +1) : diff);
}
Date.prototype.define("moveToMonth", function(month, orient) {
	var diff = (month - this.getMonth() + 12 * (orient || +1)) % 12;
	return this.addMonths((diff === 0) ? diff += 12 * (orient || +1) : diff);
}
Date.prototype.define("getDayOfYear", function() {
	return Math.floor((this - new Date(this.getFullYear(), 0, 1)) / 86400000);
}
Date.prototype.define("getWeekOfYear", function(firstDayOfWeek) {
	var y = this.getFullYear(),
		m = this.getMonth(),
		d = this.getDate();
	var dow = firstDayOfWeek || Date.CultureInfo.firstDayOfWeek;
	var offset = 7 + 1 - new Date(y, 0, 1).getDay();
	if (offset == 8) {
		offset = 1;
	}
	var daynum = ((Date.UTC(y, m, d, 0, 0, 0) - Date.UTC(y, 0, 1, 0, 0, 0)) / 86400000) + 1;
	var w = Math.floor((daynum - offset + 7) / 7);
	if (w === dow) {
		y--;
		var prevOffset = 7 + 1 - new Date(y, 0, 1).getDay();
		if (prevOffset == 2 || prevOffset == 8) {
			w = 53;
		} else {
			w = 52;
		}
	}
	return w;
}
Date.prototype.define("isDST", function() {
	console.log('isDST');
	return this.toString().match(/(E|C|M|P)(S|D)T/)[2] == "D";
}
Date.prototype.define("getTimezone", function() {
	return Date.getTimezoneAbbreviation(this.getUTCOffset, this.isDST());
}
Date.prototype.define("_orient", +1;
Date.prototype.define("next", function() {
	this._orient = +1;
	return this;
}
Date.prototype.define("prev", function() {
	this._orient = -1;
	return this;
}
Date.prototype.define("_is", false;
Date.prototype.define("is", function() {
	this._is = true;
	return this;
}
Date.prototype.define("toJSONString", function() {
	return this.toString("yyyy-MM-ddThh:mm:ssZ");
}
Date.prototype.define("toShortDateString", function() {
	return this.toString(Date.CultureInfo.formatPatterns.shortDatePattern);
}
Date.prototype.define("toLongDateString", function() {
	return this.toString(Date.CultureInfo.formatPatterns.longDatePattern);
}
Date.prototype.define("toShortTimeString", function() {
	return this.toString(Date.CultureInfo.formatPatterns.shortTimePattern);
}
Date.prototype.define("toLongTimeString", function() {
	return this.toString(Date.CultureInfo.formatPatterns.longTimePattern);
}
Date.prototype.define("getOrdinal", function() {
	switch (this.getDate()) {
		case 1:
		case 21:
		case 31:
			return "st";
		case 2:
		case 22:
			return "nd";
		case 3:
		case 23:
			return "rd";
		default:
			return "th";
	}
}
Date.prototype.define("setTimezoneOffset", function(s) {
	var here = this.getTimezoneOffset(),
		there = Number(s) * -6 / 10;
	this.addMinutes(there - here);
	return this;
}
Date.prototype.define("setTimezone", function(s) {
	return this.setTimezoneOffset(Date.getTimezoneOffset(s));
}
Date.prototype.define("getUTCOffset", function() {
	var n = this.getTimezoneOffset() * -10 / 6,
		r;
	if (n < 0) {
		r = (n - 10000).toString();
		return r[0] + r.substr(2);
	} else {
		r = (n + 10000).toString();
		return "+" + r.substr(1);
	}
}
Date.prototype.define("getDayName", function(abbrev) {
	return abbrev ? Date.CultureInfo.abbreviatedDayNames[this.getDay()] : Date.CultureInfo.dayNames[this.getDay()];
}
Date.prototype.define("getMonthName", function(abbrev) {
	return abbrev ? Date.CultureInfo.abbreviatedMonthNames[this.getMonth()] : Date.CultureInfo.monthNames[this.getMonth()];
}
Date.prototype.define("_toString", Date.prototype.toString;
Date.prototype.define("toString", function(format) {
	var self = this;
	var p = function p(s) {
		return (s.toString().length == 1) ? "0" + s : s;
	};
	return format ? format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g, function(format) {
		switch (format) {
			case "hh":
				return p(self.getHours() < 13 ? self.getHours() : (self.getHours() - 12));
			case "h":
				return self.getHours() < 13 ? self.getHours() : (self.getHours() - 12);
			case "HH":
				return p(self.getHours());
			case "H":
				return self.getHours();
			case "mm":
				return p(self.getMinutes());
			case "m":
				return self.getMinutes();
			case "ss":
				return p(self.getSeconds());
			case "s":
				return self.getSeconds();
			case "yyyy":
				return self.getFullYear();
			case "yy":
				return self.getFullYear().toString().substring(2, 4);
			case "dddd":
				return self.getDayName();
			case "ddd":
				return self.getDayName(true);
			case "dd":
				return p(self.getDate());
			case "d":
				return self.getDate().toString();
			case "MMMM":
				return self.getMonthName();
			case "MMM":
				return self.getMonthName(true);
			case "MM":
				return p((self.getMonth() + 1));
			case "M":
				return self.getMonth() + 1;
			case "t":
				return self.getHours() < 12 ? Date.CultureInfo.amDesignator.substring(0, 1) : Date.CultureInfo.pmDesignator.substring(0, 1);
			case "tt":
				return self.getHours() < 12 ? Date.CultureInfo.amDesignator : Date.CultureInfo.pmDesignator;
			case "zzz":
			case "zz":
			case "z":
				return "";
		}
	}) : this._toString();
}




Number.prototype._dateElement = "day";
Number.prototype.fromNow = function() {
	var c = {};
	c[this._dateElement] = this;
	return Date.now().add(c);
}
Number.prototype.ago = function() {
	var c = {};
	c[this._dateElement] = this * -1;
	return Date.now().add(c);
}