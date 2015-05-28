

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
