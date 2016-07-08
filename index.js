function createObjectManipulators (typecheckers) {
  'use strict';
  function traverseShallow(entity,cb){
    if(!typecheckers.isFunction(cb)){
      return;
    }
    for(var i in entity){
      if(!entity.hasOwnProperty(i)){
        continue;
      }
      cb(entity[i], i);
    }
  };

  function traverseShallowConditionally(entity,cb){
    var r;
    if(!typecheckers.isFunction(cb)){
      return;
    }
    for(var i in entity){
      if(!entity.hasOwnProperty(i)){
        continue;
      }
      r = cb(entity[i],i);
      if(typeof r !== 'undefined'){
        return r;
      }
    }
  };

  function traverse(entity,cb){
    if(!typecheckers.isFunction(cb)){
      return;
    }
    for(var i in entity){
      cb(entity[i],i);
    }
  };

  function traverseConditionally(entity,cb){
    var r;
    if(!typecheckers.isFunction(cb)){
      return;
    }
    for(var i in entity){
      r = cb(entity[i],i);
      if(typeof r !== 'undefined'){
        return r;
      }
    }
  };

  function _doPick (obj, ret, key) {
    if (!(key in obj)) return;
    ret[key] = obj[key];
  }

  function pick (obj, list) {
    //put in new obj all props from list
    var ret = {};
    list.forEach (_doPick.bind(null, obj, ret));
    return ret;
  }

  function _doPickExcept (ret, list, value, key) {
    if (list.indexOf(key) >= 0) return;
    ret[key] = value;
  }

  function pickExcept (obj, list){
    //put in new obj all props but the ones from list
    var ret = {};
    traverse(obj, _doPickExcept.bind(null, ret, list));
    return ret;
  }

  return {
    pick : pick,
    pickExcept : pickExcept,
    traverse:traverse,
    traverseConditionally:traverseConditionally,
    traverseShallow:traverseShallow,
    traverseShallowConditionally:traverseShallowConditionally,
    extend: require('./extend')(typecheckers),
    extendShallow: require('./extendshallow')(typecheckers)
  };
}

module.exports = createObjectManipulators;
