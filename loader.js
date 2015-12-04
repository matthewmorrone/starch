/*!
 * Loader v0.1.0
 * https://github.com/fengyuanchen/loader
 *
 * Copyright (c) 2015 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2015-11-29T07:15:32.281Z
 */

(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(global, true);
  } else {
    factory(global);
  }
})(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {

  'use strict';


  // Variables
  // ---------------------------------------------------------------------------

  // Globals
  var btoa = window.btoa;
  var DataView = window.DataView;
  var Uint8Array = window.Uint8Array;
  var ArrayBuffer = window.ArrayBuffer;

  // Maths
  var PI = Math.PI;
  var min = Math.min;
  var max = Math.max;
  var sin = Math.sin;
  var cos = Math.cos;
  var abs = Math.abs;

  // Shortcuts
  var toString = Object.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var fromCharCode = String.fromCharCode;


  // Utilities
  // ---------------------------------------------------------------------------

  function typeOf(obj) {
    return toString.call(obj).slice(8, -1).toLowerCase();
  }

  function isNumber(num) {
    return typeof num === 'number' && !isNaN(num);
  }

  function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
  }

  function isPlainObject(obj) {
    var constructor;
    var prototype;

    if (!isObject(obj)) {
      return false;
    }

    try {
      constructor = obj.constructor;
      prototype = constructor.prototype;

      return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
    } catch (e) {
      return false;
    }
  }

  function isFunction(fn) {
    return typeOf(fn) === 'function';
  }

  function isArray(arr) {
    return Array.isArray ? Array.isArray(arr) : typeOf(arr) === 'array';
  }

  function toArray(obj, offset) {
    var args = [];

    // This is necessary for IE8
    if (isNumber(offset)) {
      args.push(offset);
    }

    return args.slice.apply(obj, args);
  }

  function each(obj, callback) {
    var length;
    var i;

    if (obj && isFunction(callback)) {
      if (isArray(obj) || isNumber(obj.length)/* array-like */) {
        for (i = 0, length = obj.length; i < length; i++) {
          if (callback.call(obj, obj[i], i, obj) === false) {
            break;
          }
        }
      } else if (isObject(obj)) {
        for (i in obj) {
          if (hasOwnProperty.call(obj, i)) {
            if (callback.call(obj, obj[i], i, obj) === false) {
              break;
            }
          }
        }
      }
    }

    return obj;
  }

  function extend(obj) {
    var args = toArray(arguments);

    if (args.length > 1) {
      args.shift();
    }

    each(args, function (arg) {
      each(arg, function (prop, i) {
        obj[i] = prop;
      });
    });

    return obj;
  }

  function proxy(fn, context) {
    var args = toArray(arguments, 2);

    return function () {
      return fn.apply(context, args.concat(toArray(arguments)));
    };
  }

  function getStringFromCharCode(dataView, start, length) {
    var str = '';
    var i;

    for (i = start, length += start; i < length; i++) {
      str += fromCharCode(dataView.getUint8(i));
    }

    return str;
  }


  function getBase64URL(buffer) {
    var unit8 = new Uint8Array(buffer);
    var length = unit8.length;
    var base64 = '';
    var i;

    for (i = 0; i < length; i++) {
      base64 += fromCharCode(unit8[i]);
    }

    // Only for JPEG image
    return 'data:image/jpeg;base64,' + btoa(base64);
  }

  function createImage(url) {
    var image = new Image();

    image.src = url;

    return image;
  }

  function getRotatedSizes(data) {
    var deg = abs(data.degree) % 180;
    var arc = (deg > 90 ? (180 - deg) : deg) * PI / 180;
    var sinArc = sin(arc);
    var cosArc = cos(arc);
    var width = data.width;
    var height = data.height;

    return {
      width: width * cosArc + height * sinArc,
      height: width * sinArc + height * cosArc
    };
  }

  // Constructor
  // ---------------------------------------------------------------------------

  /**
   * Loader constructor
   *
   * @param {HTMLImageElement} image
   * @param {Object} options
   */
  function Loader(image, options) {
    this.image = image;
    this.options = extend({}, Loader.DEFAULTS, isPlainObject(options) && options);
    this.data = null;
    this.init();
  }

  Loader.prototype = {
    constructor: Loader,

    init: function () {
      var image = this.image;
      var read = proxy(this.read, this);
      var xhr;

      if (image && image.tagName === 'IMG' && image.src) {
        if (!ArrayBuffer) {
          return this.load(image);
        }

        xhr = new XMLHttpRequest();

        xhr.onload = function () {
          if (this.status === 200) {
            read(this.response);
          }
        };

        xhr.open('get', image.src, true);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
      } else {
        throw new Error('The given image is not a valid image');
      }
    },

    read: function (arrayBuffer) {
      var orientation = this.readOrientation(arrayBuffer);

      if (orientation) {
        this.translate(orientation);
        this.load(createImage(getBase64URL(arrayBuffer)));
      } else {
        this.load(this.image);
      }
    },

    readOrientation: function (arrayBuffer) {
      var dataView = new DataView(arrayBuffer);
      var length = dataView.byteLength;
      var orientation;
      var exifIDCode;
      var tiffOffset;
      var firstIFDOffset;
      var littleEndian;
      var endianness;
      var app1Start;
      var ifdStart;
      var offset;
      var i;

      // Only handle JPEG image (0xFFD8)
      if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
        offset = 2;

        while (offset < length) {
          if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
            app1Start = offset;
            break;
          }

          offset++;
        }
      }

      if (app1Start) {
        exifIDCode = app1Start + 4;
        tiffOffset = app1Start + 10;

        if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
          endianness = dataView.getUint16(tiffOffset);
          littleEndian = endianness === 0x4949;

          if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
            if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
              firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

              if (firstIFDOffset >= 0x00000008) {
                ifdStart = tiffOffset + firstIFDOffset;
              }
            }
          }
        }
      }

      if (ifdStart) {
        length = dataView.getUint16(ifdStart, littleEndian);

        for (i = 0; i < length; i++) {
          offset = ifdStart + i * 12 + 2;

          if (dataView.getUint16(offset, littleEndian) === 0x0112 /* Orientation */) {

            // Get the original orientation value
            orientation = dataView.getUint16(offset + 8, littleEndian);

            // Override the orientation with the default value: 1
            dataView.setUint16(offset + 8, 1, littleEndian);
            break;
          }
        }
      }

      return orientation;
    },

    translate: function (orientation) {
      var rotate = 0;
      var scaleX = 1;
      var scaleY = 1;

      switch (orientation) {

        // horizontal flip
        case 2:
          scaleX = -1;
          break;

        // 180° rotate left
        case 3:
          rotate = -180;
          break;

        // vertical flip
        case 4:
          scaleY = -1;
          break;

        // vertical flip + 90° rotate right
        case 5:
          rotate = 90;
          scaleY = -1;
          break;

        // 90° rotate right
        case 6:
          rotate = 90;
          break;

        // horizontal flip + 90° rotate right
        case 7:
          rotate = 90;
          scaleX = -1;
          break;

        // 90° rotate left
        case 8:
          rotate = -90;
          break;
      }

      this.data = {
        rotate: rotate,
        scaleX: scaleX,
        scaleY: scaleY
      };
    },

    load: function (image) {
      var load = proxy(function () {
            this.resize(image);
            image.removeEventListener('load', load, false);
          }, this);

      if (image.complete) {
        this.resize(image);
      } else {
        image.addEventListener('load', load, false);
      }
    },

    draw: function (image) {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var data = this.data;
      var x = 0;
      var y = 0;
      var width = image.naturalWidth;
      var height = image.naturalHeight;
      var rotate = data && data.rotate;
      var scaleX = data && data.scaleX;
      var scaleY = data && data.scaleY;
      var scalable = isNumber(scaleX) && isNumber(scaleY) && (scaleX !== 1 || scaleY !== 1);
      var rotatable = isNumber(rotate) && rotate !== 0;
      var advanced = rotatable || scalable;
      var canvasWidth = width;
      var canvasHeight = height;
      var translateX;
      var translateY;
      var rotated;

      if (scalable) {
        translateX = width / 2;
        translateY = height / 2;
      }

      if (rotatable) {
        rotated = getRotatedSizes({
          width: width,
          height: height,
          degree: rotate
        });

        canvasWidth = rotated.width;
        canvasHeight = rotated.height;
        translateX = rotated.width / 2;
        translateY = rotated.height / 2;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      if (advanced) {
        x = -width / 2;
        y = -height / 2;

        context.save();
        context.translate(translateX, translateY);
      }

      if (rotatable) {
        context.rotate(rotate * PI / 180);
      }

      // Should call `scale` after rotated
      if (scalable) {
        context.scale(scaleX, scaleY);
      }

      context.drawImage(image, x, y, width, height);

      if (advanced) {
        context.restore();
      }

      return canvas;
    },

    resize: function (image) {
      var options = this.options;
      var canvas = this.draw(image);
      var width = canvas.width;
      var height = canvas.height;
      var aspectRatio = width / height;
      var newCanvas = document.createElement('canvas');
      var minWidth = max(0, options.minWidth) || 0;
      var minHeight = max(0, options.minHeight) || 0;
      var maxWidth = max(minWidth, options.maxWidth) || Infinity;
      var maxHeight = max(minHeight, options.maxHeight) || Infinity;
      var newWidth = abs(options.width) || width;
      var newHeight =  abs(options.height) || height;

      if (minWidth > 0 && isFinite(minWidth)) {
        minHeight = minWidth / aspectRatio;
      } else if (minHeight > 0 && isFinite(minHeight)) {
        minWidth = minHeight * aspectRatio;
      }

      if (maxWidth > 0 && isFinite(maxWidth)) {
        maxHeight = maxWidth / aspectRatio;
      } else if (maxHeight > 0 && isFinite(maxHeight)) {
        maxWidth = maxHeight * aspectRatio;
      }

      newWidth = min(max(newWidth, minWidth), maxWidth);
      newHeight = min(max(newHeight, minHeight), maxHeight);

      if (isNumber(newWidth) && isNumber(newHeight)) {
        if (newHeight * aspectRatio > newWidth) {
          newHeight = newWidth / aspectRatio;
        } else {
          newWidth = newHeight * aspectRatio;
        }
      } else {
        newWidth = width;
        newHeight = height;
      }

      newCanvas.width = newWidth;
      newCanvas.height = newHeight;

      newCanvas.getContext('2d').drawImage(
        canvas,
        0, 0, width, height,
        0, 0, newWidth, newHeight
      );

      this.done(newCanvas);
    },

    done: function (canvas) {
      var options = this.options;
      var result = canvas;

      if (options.type === 'image') {
        result = createImage(canvas.toDataURL());
      }

      if (isFunction(options.done)) {
        options.done.call(this, result);
      }
    }
  };

  Loader.DEFAULTS = {

    // String: the type of the loaded image or canvas
    type: 'image',

    // Number: the size limitation of the loaded image or canvas
    width: NaN,
    height: NaN,
    minWidth: 0,
    minHeight: 0,
    maxWidth: Infinity,
    maxHeight: Infinity,

    // Function: load complete callback
    done: null
  };


  // No Conflict
  // ---------------------------------------------------------------------------

  var _Loader = window.Loader;

  Loader.noConflict = function () {
    window.Loader = _Loader;
    return Loader;
  };


  // Export
  // ---------------------------------------------------------------------------

  if (typeof define === 'function' && define.amd) {
    define('loader', [], function () {
      return Loader;
    });
  }

  if (typeof noGlobal === 'undefined') {
    window.Loader = Loader;
  }

  return Loader;

});
