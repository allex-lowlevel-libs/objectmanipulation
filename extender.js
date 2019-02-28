function createExtender (extend2) {
  return function extend() {
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
  };
}

module.exports = createExtender;
