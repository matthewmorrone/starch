(function($, undefined) {
	$.store = function(driver, serializers) {
		var that = this;
		if (typeof driver == 'string') {
			if ($.store.drivers[driver]) this.driver = $.store.drivers[driver];
			else throw new Error('Unknown driver ' + driver);
		}
		else if (typeof driver == 'object') {
			var invalidAPI = !$.isFunction(driver.init) || !$.isFunction(driver.get) || !$.isFunction(driver.set) || !$.isFunction(driver.del) || !$.isFunction(driver.flush);
			if (invalidAPI) throw new Error('The specified driver does not fulfill the API requirements');
			this.driver = driver;
		}
		else {
			$.each($.store.drivers, function() {
				if (!$.isFunction(this.available) || !this.available()) return true;
				that.driver = this;
				if (that.driver.init() === false) {
					that.driver = null;
					return true;
				}
				return false;
			});
		}
		if (!serializers) serializers = $.store.serializers;
		this.serializers = {};
		$.each(serializers, function(key, serializer) {
			if (!$.isFunction(this.init)) return true;
			that.serializers[key] = this;
			that.serializers[key].init(that.encoders, that.decoders);
		});
	};
	$.extend($.store.prototype, {
		get: function(key) {
			var value = this.driver.get(key);
			return this.driver.encodes ? value : this.unserialize(value);
		},
		set: function(key, value) {
			this.driver.set(key, this.driver.encodes ? value : this.serialize(value));
		},
		del: function(key) {
			this.driver.del(key);
		},
		flush: function() {
			this.driver.flush();
		},
		driver: undefined,
		encoders: [],
		decoders: [],
		serialize: function(value) {
			var that = this;
			$.each(this.encoders, function() {
				var serializer = that.serializers[this + ""];
				if (!serializer || !serializer.encode) return true;
				try {
					value = serializer.encode(value);
				}
				catch (e) {}
			});
			return value;
		},
		unserialize: function(value) {
			var that = this;
			if (!value) return value;
			$.each(this.decoders, function() {
				var serializer = that.serializers[this + ""];
				if (!serializer || !serializer.decode) return true;
				value = serializer.decode(value);
			});
			return value;
		}
	});
	$.store.drivers = {
		'localStorage': {
			ident: "$.store.drivers.localStorage",
			scope: 'browser',
			available: function() {
				try {
					if (!!window.localStorage) {
						window.localStorage.setItem("jQuery Store Availability test", true);
						window.localStorage.removeItem("jQuery Store Availability test");
						return true;
					};
					return false;
				}
				catch (e) {
					return false;
				}
			},
			init: $.noop,
			get: function(key) {
				return window.localStorage.getItem(key);
			},
			set: function(key, value) {
				window.localStorage.setItem(key, value);
			},
			del: function(key) {
				window.localStorage.removeItem(key);
			},
			flush: function() {
				window.localStorage.clear();
			}
		},
		'userData': {
			ident: "$.store.drivers.userData",
			element: null,
			nodeName: 'userdatadriver',
			scope: 'browser',
			initialized: false,
			available: function() {
				try {
					return !!(document.documentElement && document.documentElement.addBehavior);
				}
				catch (e) {
					return false;
				}
			},
			init: function() {
				if (this.initialized) return;
				try {
					this.element = document.createElement(this.nodeName);
					document.documentElement.insertBefore(this.element, document.getElementsByTagName('title')[0]);
					this.element.addBehavior("#default#userData");
					this.initialized = true;
				}
				catch (e) {
					return false;
				}
			},
			get: function(key) {
				this.element.load(this.nodeName);
				return this.element.getAttribute(key);
			},
			set: function(key, value) {
				this.element.setAttribute(key, value);
				this.element.save(this.nodeName);
			},
			del: function(key) {
				this.element.removeAttribute(key);
				this.element.save(this.nodeName);
			},
			flush: function() {
				var attrs = this.element.xmlDocument.firstChild.attributes;
				for (var i = attrs.length - 1; i >= 0; i--) {
					this.element.removeAttribute(attrs[i].nodeName);
				}
				this.element.save(this.nodeName);
			}
		},
		'windowName': {
			ident: "$.store.drivers.windowName",
			scope: 'window',
			cache: {},
			encodes: true,
			available: function() {
				return true;
			},
			init: function() {
				this.load();
			},
			save: function() {
				window.name = $.store.serializers.json.encode(this.cache);
			},
			load: function() {
				try {
					this.cache = $.store.serializers.json.decode(window.name + "");
					if (typeof this.cache != "object") this.cache = {};
				}
				catch (e) {
					this.cache = {};
					window.name = "{}";
				}
			},
			get: function(key) {
				return this.cache[key];
			},
			set: function(key, value) {
				this.cache[key] = value;
				this.save();
			},
			del: function(key) {
				try {
					delete this.cache[key];
				}
				catch (e) {
					this.cache[key] = undefined;
				}
				this.save();
			},
			flush: function() {
				window.name = "{}";
			}
		}
	};
	$.store.serializers = {
		'json': {
			ident: "$.store.serializers.json",
			init: function(encoders, decoders) {
				encoders.push("json");
				decoders.push("json");
			},
			encode: JSON.stringify,
			decode: JSON.parse
		},
		'xml': {
			ident: "$.store.serializers.xml",
			init: function(encoders, decoders) {
				encoders.unshift("xml");
				decoders.push("xml");
			},
			isXML: function(value) {
				var documentElement = (value ? value.ownerDocument || value : 0).documentElement;
				return documentElement ? documentElement.nodeName.toLowerCase() !== "html" : false;
			},
			encode: function(value) {
				if (!value || value._serialized || !this.isXML(value)) return value;
				var _value = {
					_serialized: this.ident,
					value: value
				};
				try {
					_value.value = new XMLSerializer().serializeToString(value);
					return _value;
				}
				catch (E1) {
					try {
						_value.value = value.xml;
						return _value;
					}
					catch (E2) {}
				}
				return value;
			},
			decode: function(value) {
				if (!value || !value._serialized || value._serialized != this.ident) return value;
				var dom_parser = ("DOMParser" in window && (new DOMParser()).parseFromString);
				if (!dom_parser && window.ActiveXObject) {
					dom_parser = function(_xmlString) {
						var xml_doc = new ActiveXObject('Microsoft.XMLDOM');
						xml_doc.async = 'false';
						xml_doc.loadXML(_xmlString);
						return xml_doc;
					}
				}
				if (!dom_parser) {
					return undefined;
				}
				value.value = dom_parser.call("DOMParser" in window && (new DOMParser()) || window, value.value, 'text/xml');
				return this.isXML(value.value) ? value.value : undefined;
			}
		}
	};
})(jQuery);
