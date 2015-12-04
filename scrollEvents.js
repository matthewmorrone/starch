//
//
//
//
(function(win, doc) {
	'use strict';
	if (win.scrollEvents) {
		throw new Error('You already have a global variable named scrollEvents.');
	}

	function throttle(func, wait) {
		var timeout = null,
			previous = 0,
			later = function() {
				previous = Date.now();
				timeout = null;
				func();
			};
		return function() {
			var now = Date.now();
			if (!previous) previous = now;
			var remaining = wait - (now - previous);
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				func();
			} else if (!timeout) {
				timeout = setTimeout(later, remaining);
			}
		};
	}

	function qsa(selector) {
		return doc.querySelectorAll(selector);
	}
	var call = qsa.call,
		each = call.bind([].forEach),
		slice = call.bind([].slice),
		listeners = [],
		runner = throttle(function() {
			each(listeners, function(listener) {
				listener();
			});
		}, 50);

	function addEventListener(fn) {
		if (!listeners.length) {
			win.addEventListener('scroll', runner);
		}
		listeners.push(fn);
		return function removeEventListener() {
			var index = listeners.indexOf(fn);
			if (index > -1) {
				listeners.splice(index, 1);
			}
			if (!listeners.length) {
				win.removeEventListener('scroll', runner);
			}
		};
	}
	var methods = {
			/**
			 * Changes element class.
			 */
			changeClass: function(initial, changed) {
				if (arguments.length < 2) {
					throw new Error('You have not supplied all parameters to scrollEvents.changeClass.');
				}
				return function(el, below) {
					var classes = el.classList;
					classes.toggle(initial, !below);
					classes.toggle(changed, below);
				};
			},
			/**
			 * Changes element html content.
			 */
			changeHTML: function(initial, changed) {
				if (arguments.length < 2) {
					throw new Error('You have not supplied all parameters to scrollEvents.changeHTML.');
				}
				return function(el, below) {
					el.innerHTML = below ? changed : initial;
				};
			},
			/**
			 * Changes element.style.property value.
			 */
			changeStyle: function(property, initial, changed) {
				if (arguments.length < 3) {
					throw new Error('You have not supplied all parameters to scrollEvents.changeStyle.');
				}
				return function(el, below) {
					el.style[property] = below ? changed : initial;
				};
			},
			/**
			 * Changes element.textContent.
			 */
			changeText: function(initial, changed) {
				if (arguments.length < 2) {
					throw new Error('You have not supplied all parameters to scrollEvents.changeText.');
				}
				return function(el, below) {
					el.textContent = below ? changed : initial;
				};
			}
		},
		methodNames = Object.keys(methods),
		whenMethods = {
			/**
			 * Generic method
			 */
			when: function(breakPoint) {
				var type;
				if (!breakPoint) {
					throw new Error('breakPoint is required for scrollEvents.when.');
				}
				type = typeof breakPoint;
				switch (type) {
					case 'function':
						return breakPoint;
					case 'string':
						return whenMethods.whenElement.apply(whenMethods, arguments);
					case 'number':
						return whenMethods.whenDistance.apply(whenMethods, arguments);
					default:
						throw new Error('Unknown breakPoint type "' + type + '" for scrollEvents.when.');
				}
			},
			/**
			 * When scroll distance reaches the breakpoint
			 */
			whenDistance: function(breakPoint) {
				if (typeof breakPoint !== 'number') {
					throw new Error('breakPoint should be a number for scrollEvents.whenDistance.');
				}
				return function() {
					return breakPoint;
				};
			},
			/**
			 * When element selector enters the view port or hits top.
			 */
			whenElement: function(selector, hitsTop) {
				if (typeof selector !== 'string') {
					throw new Error('breakPoint should be a string for scrollEvents.whenElement.');
				}
				selector = doc.querySelector(selector);
				if (hitsTop === true) {
					return function() {
						return selector.offsetTop;
					};
				}
				return function() {
					return selector.offsetTop - win.innerHeight;
				};
			},
			/**
			 * When element enters the viewport.
			 */
			whenElementEnters: function(selector) {
				return whenMethods.whenElement(selector, false);
			},
			/**
			 * When element hits the viewport top.
			 */
			whenElementHitsTop: function(selector) {
				return whenMethods.whenElement(selector, true);
			}
		},
		whenMethodNames = Object.keys(whenMethods);

	function scrollSpy(selector) {
		var spy = {},
			callbacks = [],
			defaultBreakPoint;
		if (!selector) {
			throw new Error('Selector is required to apply scroll events to.');
		}
		methodNames.forEach(function(name) {
			var method = methods[name];

			function makeBreakPointChecker(args) {
				var params = slice(args, method.length),
					breakPoint = params.length;
				breakPoint = breakPoint ? whenMethods.when.apply(whenMethods, params) : defaultBreakPoint;
				return function() {
					return win.pageYOffset > breakPoint();
				};
			}
			spy[name] = function() {
				var previous,
					args = arguments,
					isBelow = makeBreakPointChecker(args),
					callback = method.apply(spy, args);
				callbacks.push(function(elements) {
					var current = isBelow();
					if (current !== previous) {
						previous = current;
						if (!elements) {
							elements = qsa(selector);
						}
						each(elements, function(el) {
							callback(el, current);
						});
					}
					return elements;
				});
				return spy;
			};
		});
		whenMethodNames.forEach(function(name) {
			var method = whenMethods[name];
			method = method.apply.bind(method, methodNames);
			spy[name] = function() {
				defaultBreakPoint = method(arguments);
				return spy;
			};
		});

		function listener() {
			var elements;
			each(callbacks, function(cb) {
				elements = cb(elements);
			});
		}

		function noop() {
			return spy;
		}
		spy.on = function on() {
			var unbinder = addEventListener(listener);
			spy.on = noop;
			spy.off = function off() {
				unbinder();
				spy.off = noop;
				spy.on = on;
				return spy;
			};
			return spy;
		};
		spy.on();
		spy.when(scrollSpy.breakPoint, !scrollSpy.useViewportHeight);
		return spy;
	}
	scrollSpy.breakPoint = 10;
	//
	scrollSpy.useViewportHeight = true;
	methodNames.forEach(function(name) {
		scrollSpy[name] = function(selector /*, rest...*/ ) {
			var rest = slice(arguments, 1),
				spy = scrollSpy(selector);
			return spy[name].apply(spy, rest);
		};
	});
	win.scrollEvents = scrollSpy;
})(window, document);
