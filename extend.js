function createExtend(typecheckers) {
  'use strict';
  function extend2(dest,src) {
    var val;
    for (var i in src) {
      if (src.hasOwnProperty(i)) {
        val = src[i];
        if ('object' === typeof val) {
          if (val === null) {
            dest[i] = val;
            continue;
          }
          if (val instanceof Array) {
            if (!typecheckers.isArray(dest[i])) {
              dest[i] = [];
            }else{
              dest[i].splice(0, dest[i].length);
            }
            Array.prototype.push.apply(dest[i], val);
            continue;
          }
          if (dest[i] === null || 'object' !== typeof dest[i]) {
            dest[i] = {};
          }
          extend2 (dest[i], val);
        } else {
          dest[i] = src[i];
        }
      }
    }
    return dest;
  };
  function extend() {
    if (arguments.length<1) {
      return {};
    }
    if (arguments.length<2) {
      return arguments[0];
    }
    var ret = extend2(arguments[0], arguments[1]);
    for (var i=2; i<arguments.length; i++){
      ret = extend2(ret, arguments[i]);
    }
    return ret;
  }
  return extend;
}

module.exports = createExtend;
