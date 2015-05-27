var log = console.log.bind(console)

function Nihil() {}
Nihil.prototype = Object.create(null)

function isObject(object) {
    var type = typeof object
    return type === 'function' || type === 'object' && !!object
}

var nativeAlert = window.alert
window.alert = function() {
    return nativeAlert(arguments.join("\n"))
}

Object.defineProperty(Object.prototype, "define", {
    configurable: true,
    enumerable: false,
    writable: false,
    value: function(name, value) {
        if (Object[name]) {
            delete Object[name]
        }
        Object.defineProperty(this, name, {
            configurable: true,
            enumerable: false,
            value: value
        })
        return this
    }
})
Object.prototype.define("extend", function() {
    function(src) {
        var target = this
        if (isObject(src)) {
            for (var o in src) {
                if (Object[src[o]]) {
                    delete Object[src[o]]
                }
                this.define(o, src[o])
            }
        }
        return this
    }
})





Set.prototype.define("each", Set.prototype.forEach)

function Arrayfrom(s) {
    var result = [],
        iter = s.keys()
    for (var e of iter) {
        result.push(e.split(","))
    }
    return result
}







event.prototype.define("getTarget", function() {
    e = e || window.event
    return e.target || e.srcElement
})



(function() {
    var i, len, methods = Object.getOwnPropertyNames(Array.prototype)
    for (i = 0, len = methods.length; i < len; i += 1) {
        if (arguments.constructor.prototype.hasOwnProperty(methods[i]) === false) {
            arguments.constructor.prototype.define(methods[i], Array.prototype[methods[i]])
        }
        if (NodeList.prototype.hasOwnProperty(methods[i]) === false) {
            NodeList.prototype.define(methods[i], Array.prototype[methods[i]])
        }
    }
}())


var $_ = {
    getHTML: function(url, callback) {
        // Feature detection
        if (!window.XMLHttpRequest) return
            // Create new request
        var xhr = new XMLHttpRequest()
            // Setup callback
        xhr.onload = function() {
            if (callback && typeof(callback) === 'function') {
                callback(this.responseXML)
            }
        }
        // Get the HTML
        xhr.open('GET', url)
        xhr.responseType = 'document'
        xhr.send()
    },
    getJSONP: function(url, callback) {
        // Create script with url and callback (if specified)
        var ref = window.document.getElementsByTagName('script')[0]
        var script = window.document.createElement('script')
        script.src = url + (url.indexOf('?') + 1 ? '&' : '?') + 'callback=' + callback
        // Insert script tag into the DOM (append to <head>)
        ref.parentNode.insertBefore(script, ref)
        // After the script is loaded (and executed), remove it
        script.onload = function() {
            this.remove()
        }
    },
    ready: function(fn) {
        if (document.readyState != 'loading') {
            fn()
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn)
        } else {
            document.attachEvent('onreadystatechange', function() {
                if (document.readyState != 'loading') {
                    fn()
                }
            })
        }
    },
    parseHTML: function(str) {
        var el = document.createElement('div')
        el.innerHTML = str
        return el.children
    },
    parseJSON: function(str) {
        return JSON.parse(str)
    },
    delegate: function(eventName, handler) {
        if (document.addEventListener) {
            document.addEventListener(eventName, handler)
            // handler's first argument is the event object, which contains the target
        } else {
            document.attachEvent('on' + eventName, function() {
                handler.call(document)
            })
        }
    },
    undelegate: function(eventName, handler) {
        if (document.removeEventListener) {
            document.removeEventListener(eventName, handler)
        } else {
            document.detachEvent('on' + eventName, handler)
        }
    },
    now: function() {
        return new Date().getTime()
    },
    getJSON: function(url) {
        var request = new XMLHttpRequest()
        request.open('GET', url, true)
        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    // Success!
                    var data = JSON.parse(this.responseText)
                } else {
                    // Error :(
                }
            }
        }
        request.send()
        request = null
    },
    post: function(url) {
        var request = new XMLHttpRequest()
        request.open('POST', url, true)
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        request.send(data)
    },
    request: function(url) {
        var request = new XMLHttpRequest()
        request.open('GET', url, true)
        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    var resp = this.responseText
                } else {}
            }
        }
        request.send()
        request = null
    },
    filter: function(selector, filterFn) {
        function filter() {
            var elements = document.querySelectorAll(selector)
            var out = []
            for (var i = elements.length; i--;) {
                if (filterFn(elements[i])) {
                    out.unshift(elements[i])
                }
            }
            return out
        }
        return filter(selector, filterFn)
    },
    query: function(selector) {
        return document.querySelectorAll(selector)
    },
    each: function(selector, fn) {
        var elements = document.querySelectorAll(selector)
        for (var i = 0; i < elements.length; i++) {
            fn(elements[i], i)
        }
        return this
    },
    deepExtend: function(out) {
        out = out || {}
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i]
            if (!obj) {
                continue
            }
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object') {
                        deepExtend(out[key], obj[key])
                    } else {
                        out[key] = obj[key]
                    }
                }
            }
        }
        return out
    },
    extend: function(out) {
        out = out || {}
        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i]) {
                continue
            }
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    out[key] = arguments[i][key]
                }
            }
        }
        return out
    }
}


Function.prototype.repeat = function(n) {
    n = n || 2;
    var m = 0,
        p = "",
        r = "";
    while (m < n) {
        p = 0;
        p = "" + this.call();
        if (p) {
            r += p;
        }
        m++;
    }
    return "" + r;
}
Object.prototype.isString = function() {
    return typeof this.constructor() === "string";
}
var rand = function(min, max, round, mt) {
    if (arguments.length === 0) {
        return Math.random();
    }
    if (!round) {
        round = 1;
    }
    if (!max) {
        var max = min;
        min = 1;
    }
    if (max.isString()) {
        max = max.charCodeAt(0);
        min = min.charCodeAt(0);
        return String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    if (mt) {
        min = parseInt(min, 10);
        max = parseInt(max, 10);
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


Math.rand = function(min, max, round, mt) {
    return function() {
        return rand(min, max, round, mt)
    }
}
Math.rand(6, 9).repeat(3)
Math.rand("A", "Z").repeat(3)