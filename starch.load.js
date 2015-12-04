
function loadScripts(paths, callback) {
	var length = paths.length;
	for (var i = 0, ii = length; i < ii; i++) {
		var script = document.createElement('script');
		script.async = false;
		script.src = paths[i] + '.js';
		script.onload = function() {
			if (--length === 0) {
				callback();
			}
		};
		document.documentElement.appendChild(script);
	}
}

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
    script.src = src;
    script.type = 'text/javascript';
    script.async = false;
    document.head.appendChild(script);
});

Object.extend() // sugar.js

(function(window/*, document*/) {
    var document = document;// || window.document;
    var loadScript = function(url, cb, async, where) {
        var script = document.createElement("script");
        script.type  = "text/javascript";
        script.src   = url;                 // script.setAttribute("src", src);
        script.async = async || true;       // script.setAttribute("async", "true");

        if (script.readyState) {
            script.onreadystatechange = function() {
                if (/loaded|complete/.test(script.readyState)) {
                    cb();
                }
            }
        }
        else {
            script.onLoad = cb;
            // script.onLoad = cb || function() {cb(); }
            // script.addEventListener("load", cb, false);
        }

        // loadScript("http://localhost:3002/a.js", function() {
        //     loadScript("http://localhost:3002/b.js", function() {
        //         console.log(A());
        //         console.log(B());
        //     });
        // });
    };
    window.loadScript = loadScript;

    if (window.attachEvent) {
        window.attachEvent('onload', loadScript);
    } else {
        window.addEventListener('load', loadScript, false);
    }
})(window)

// if (a) {
//     loadScript("a.js", function() {

//     });
// } else {
//     loadScript("b.js", function() {

//     });
// }
