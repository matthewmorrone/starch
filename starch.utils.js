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
Object.prototype.define("extend", function(src) {
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
})





