function createExtend2(typecheckers, doconcat) {
  'use strict';
  return function extend2(dest,src) {
    var val;
    for (var i in src) {
      if (!src.hasOwnProperty(i)) {
        continue;
      }
      val = src[i];
      if ('object' === typeof val) {
        if (val === null) {
          dest[i] = val;
          continue;
        }
        if (val instanceof Array) {
          if (!typecheckers.isArray(dest[i])) {
            dest[i] = [];
          }else if (!doconcat){
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
        dest[i] = val;
      }
    }
    return dest;
  };
}

module.exports = createExtend2;
