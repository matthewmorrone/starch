(function (con) {
    // the dummy function
    function dummy() {}
    // console methods that may exist
    for(var methods = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(','), func; func = methods.pop();) {
      con[func] = con[func] || dummy;
    }
}(window.console = window.console || {}));

console.currentScript = function () {
  if (document.currentScript) {
    return document.currentScript;
  }
  var scripts = document.getElementsByTagName('script');
  return scripts[scripts.length - 1];
}
console.functionExists = function (func_name) {
  if (typeof func_name === 'string') {
    func_name = window[func_name];
  }
  return typeof func_name === 'function';
}
console.functions = function () {
  var i = '',
    arr = [],
    already = {};
  for (i in window) {
    try {
      if (typeof window[i] === 'function') {
        if (!already[i]) {
          already[i] = 1;
          arr.push(i);
        }
      } else if (typeof window[i] === 'object') {
        for (var j in window[i]) {
          if (typeof window[j] === 'function' && window[j] && !already[j]) {
            already[j] = 1;
            arr.push(j);
          }
        }
      }
    } catch (e) {}
  }
  return arr;
}
console.vars = function () {
  var i = '',
    arr = [],
    already = {};
  for (i in this.window) {
    try {
      if (typeof this.window[i] === 'object') {
        for (var j in this.window[i]) {
          if (this.window[j] && !already[j]) {
            already[j] = 1;
            arr.push(j);
          }
        }
      } else if (!already[i]) {
        already[i] = 1;
        arr.push(i);
      }
    } catch (e) {
      if (!already[i]) {
        already[i] = 1;
        arr.push(i);
      }
    }
  }
  return arr;
}
console.msieVersion = function () {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
  } else {
    return 0;
  }
  return 0;
}
console.file = function() {
  var d = window.document;
  var t = d.getElementsByTagName('script');
  if (!t || t.length === 0) {
    t = d.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'script');
  }
  var url = t[t.length - 1];
  if (url.hasAttribute('src')) {
    var src = url.getAttribute('src');
    if (src !== '' && /^(https?|chrome):/.test(src)) {
      return src;
    }
  }
  return window.location.href;
}
var getFuncName = function (fn) {
  var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
  if (!name) {
    return '(Anonymous)';
  }
  return name[1];
};
console.class = function() {
  return arguments.callee.caller && getFuncName(arguments[0].constructor);
}
console.function = function() {
  return arguments.callee.caller && getFuncName(arguments.callee.caller);
}
console.method = function() {
  return arguments.callee.caller && getFuncName(arguments[0].constructor) + '::' + getFuncName(arguments.callee.caller);
}
