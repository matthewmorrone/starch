if (!jQuery) {
	var jq = document.createElement('script')
	jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"
	document.getElementsByTagName('head')[0].appendChild(jq)
}

(function($) {
	$.file_get_contents = function(address) {
		return $.ajax({
			url: address,
			async: false
		}).responseText
	}
	$.uppercase = function(input) {
		if (typeof input !== "string" || !input) {
			return null;
		}
		return input.toUpperCase()
	}
	$.lowercase = function(input) {
		if (typeof input !== "string" || !input) {
			return null;
		}
		return input.toLowerCase()
	}
	$.capitalize = function(input) {
		if (typeof input !== "string" || !input) {
			return null;
		}
		return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
	}
	$.chomp = function(input, offset) {
		if (typeof input !== "string" || !input) {
			return null;
		}
		return input.substring(0, input.length - offset)
	}
	$.title = function(input) {
		if (arguments.length == 0) {
			return $("title").html()
		}
		$("title").html(input)
	}
	$.fn.repeat = function(input, n) {
		var result = ""
		for (var i = 0; i < n; i++) {
			result += input
		}
		return result
	}
	$.fn.confirm = function(mode) {
		if (mode == 1) {
			window.onbeforeunload = function() {
				return "Please Confirm."
			}
		} else {
			window.onbeforeunload = function() {}
		}
	}
	$.fn.visible = function() {
		return $(this).is(":visible")
	}
	$.fn.antiselect = function() {
		$(this).css({
			"-webkit-touch-callout": "none",
			"-webkit-user-select": "none",
			"-khtml-user-select": "none",
			"-moz-user-select": "none",
			"-ms-user-select": "none",
			"user-select": "none"
		})
		if ($(this)[0].nodeType == 1) {
			$(this)[0].setAttribute("unselectable", "on")
		}
		var child = $(this)[0].firstChild
		while (child) {
			$(child).antiselect()
			child = child.nextSibling
		}
	}
	$.fn.generateTable = function(x, y, head) {
		result = "<table>"
		for (i = 0; i < x; i++) {
			head && i == 0 ? result += "<thead>" : ""
			head && i == 1 ? result += "<tbody>" : ""
			result += "<tr>"
			for (j = 0; j < y; j++) {
				if (i == 0) {
					result += "<th class='col'>" + String.fromCharCode(64 + j) + "</th>"
				} else if (j == 0) {
					result += "<th class='row'>" + i + "</th>"
				} else {
					result += "<td></td>"
				} //<input type='text' class='cell'></input>
			}
			result += "</tr>"
			head && i == 0 ? result += "</thead>" : ""
			head && i == x - 1 ? result += "</tbody>" : ""
		}
		result += "</table>"
		$(this).html(result)
	}
	$.fn.maxHeight = function() {
		var max = 0
		this.each(function() {
			max = Math.max(max, $(this).height())
		})
		return max
	}
	$.fn.maxWidth = function() {
		var max = 0
		this.each(function() {
			max = Math.max(max, $(this).width())
		})
		return max
	}
	$.fn.tag = function() {
		return $(this)[0].tagName
	}
	$.fn.id = function(i) {
		if (i === undefined) {
			return $(this)[0].id
		}
		if (arguments.length == 0) {
			return $(this).attr("id")
		}
		if (i == "") {
			$(this).removeAttr("id")
			return this
		}
		$(this).attr("id", i)
	}
	$.fn.removeAttrs = function() {
		return this.each(function() {
			var attributes = $.map(this.attributes, function(item) {
				return item.name
			})
			var el = $(this)
			$.each(attributes, function(i, item) {
				el.removeAttr(item)
			})
		})
	}
	$.fn.center = function() {
		$(this).css("position", "absolute")
		$(this).css("top", ($(window).height() - $(this).height()) / 2 + $(window).scrollTop() + "px")
		$(this).css("left", ($(window).width() - $(this).width()) / 2 + $(window).scrollLeft() + "px")
		return $(this)
	}
	$.fn.viewport = function() {
		var w = isLessThanIE(8) ?
			(!(document.documentElement.clientWidth) ||
				(document.documentElement.clientWidth === 0)) ? document.body.clientWidth : document.documentElement.clientWidth : window.innerWidth
		var h = isLessThanIE(8) ?
			(!(document.documentElement.clientHeight) ||
				(document.documentElement.clientHeight === 0)) ? document.body.clientHeight : document.documentElement.clientHeight : window.innerHeight
		return {
			width: w,
			height: h
		}
	}

	$.each({
		top: "top",
		bottom: "bottom",
		left: "left",
		right: "right"
	}, function(name, type) {
		elem = this[0]
		$.fn[name] = function(value) {
			return $.access(this, function(elem, type, value) {
				if (value === undefined) {
					orig = $.css(elem, type)
					ret = parseFloat(orig)
					return $.isNumeric(ret) ? ret : orig
				}
				$(elem).css(type, value)

			}, type, value, arguments.length, null)
		}
	})

	$.each({
		checked: "checked",
		colspan: "colspan",
		disabled: "disabled",
		href: "href",
		id: "id",
		label: "label",
		multiple: "multiple",
		readonly: "readonly",
		rel: "rel",
		rowspan: "rowspan",
		selected: "selected",
		src: "src",
		target: "target",
		title: "title",
		type: "type"
	}, function(name, type) {
		elem = this[0]
		$.fn[name] = function(value) {
			return $.access(this, function(elem, type, value) {
				if (value === undefined) {
					orig = $.attr(elem, type);
					ret = parseFloat(orig);
					return ($.isNumeric(ret) ? ret : orig);
				}
				$(elem).attr(type, value);
			}, type, value, arguments.length, null)
		}
	})

	$.each({
		background: "background",
		backgroundColor: "background-color",
		border: "border",
		color: "color",
		cursor: "cursor",
		display: "display",
		float: "float",
		font: "font",
		height: "height",
		margin: "margin",
		padding: "padding"
	}, function(name, type) {
		elem = this[0]
		$.fn[name] = function(value) {
			return $.access(this, function(elem, type, value) {
				if (value === undefined) {
					orig = $.css(elem, type);
					ret = parseFloat(orig);
					return ($.isNumeric(ret) ? ret : orig);
				}
				$(elem).css(type, value);
			}, type, value, arguments.length, null)
		}
	});

	$.fn.define("pick", function() {
		return $(this).eq(Math.random(0, $(this).length - 1))
	})
})
(jQuery)


(function($) {

})
(jQuery);