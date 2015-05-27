[
    'starch.array.js',
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
    'starch.utils.js'
].forEach(function(src) {
    var script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = false;
    document.head.appendChild(script);
});
