
function load(arg, cb) {
    cb = cb || function() {};

    function load(url, callback) {
        callback = callback || function() {};
        var script = document.createElement("script")
        script.type = "text/javascript";
        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function() {
                callback();
            };
        }
        script.src = url;
        document.head.appendChild(script);
    }
    if (typeof arg === "string") {
        load(arg, cb);
    } else if (arg instanceof Array) {
        var i = 0, l = arg.length;
        function loadCallback() {
            if (i >= l) {
                cb();
                return false;
            }
            load(arg[i], loadCallback);
            i++;
        }
        loadCallback();
    }
}

function loadScript(src, async) {
    var script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = async || false;
    document.head.appendChild(script);
}


['starch.array.js',
 'starch.canvas.js',
 'starch.console.js',
 'starch.element.js',
 'starch.function.js',
 'starch.is.js',
 'starch.number.js',
 'starch.object.js',
 'starch.random.js',
 'starch.range.js',
 'starch.string.js',
 'starch.utils.js',
 'sugar.js'
].forEach(function(src) {
    var script = document.createElement('script');
    script.src = "starch/"+src;
    script.type = 'text/javascript';
    script.async = false;
    document.head.appendChild(script);
});

Object.extend() // sugar.js
