function createExtendShallow(typecheckers) {
  'use strict';
  function extend2Shallow(dest,src) {
    var val;
    for (var i in src) {
      if (src.hasOwnProperty(i)) {
        dest[i] = src[i];
      }
    }
    return dest;
  };
  function extendShallow() {
    if (arguments.length<1) {
      return {};
    }
    if (arguments.length<2) {
      return arguments[0];
    }
    var ret = extend2Shallow(arguments[0], arguments[1]);
    for (var i=2; i<arguments.length; i++){
      ret = extend2Shallow(ret, arguments[i]);
    }
    return ret;
  }
  return extendShallow;
}

module.exports = createExtendShallow;
