function createObjectManipulators (typecheckers) {
  'use strict';
  function traverseShallow(entity,cb){
    var i;
    /*
    if (entity === null || 'object' !== typeof entity){
      throw new Error('First parameter \'entity\' is not an object');
    }
    */
    if(!typecheckers.isFunction(cb)){
      return;
    }
    for(i in entity){
      if(!entity.hasOwnProperty(i)){
        continue;
      }
      cb(entity[i], i);
    }
  };

  function traverseShallowConditionally(entity,cb){
    var r,i;
    /*
    if (entity === null || 'object' !== typeof entity ){
      throw new Error('First parameter \'entity\' is not an object');
    }
    */
    if(!typecheckers.isFunction(cb)){
      return;
    }
    for(i in entity){
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
    var i;
    /*
    if (entity === null || 'object' !== typeof entity){
      throw new Error('First parameter \'entity\' is not an object');
    }
    */
    if(!typecheckers.isFunction(cb)){
      return;
    }
    for(i in entity){
      cb(entity[i],i);
    }
  };

  function traverseConditionally(entity,cb){
    var r,i;
    /*
    if (entity === null || 'object' !== typeof entity){
      throw new Error('First parameter \'entity\' is not an object');
    }
    */
    if(!typecheckers.isFunction(cb)){
      return;
    }
    for(i in entity){
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
    var ret;
    //put in new obj all props from list
    if (obj === null || 'object' !== typeof obj){
      throw new Error('First parameter \'obj\' is not an object');
    }
    if (!typecheckers.isArray(list)){
      throw new Error('Second parameter \'list\' is not an array');
    }
    ret = {};
    list.forEach (_doPick.bind(null, obj, ret));
    return ret;
  }

  function _doPickExcept (ret, list, value, key) {
    if (list.indexOf(key) >= 0) return;
    ret[key] = value;
  }

  function pickExcept (obj, list){
    var ret;
    if (obj === null || 'object' !== typeof obj){
      throw new Error('First parameter \'obj\' is not an object');
    }
    if (!typecheckers.isArray(list)){
      throw new Error('Second parameter \'list\' is not an array');
    }
    //put in new obj all props but the ones from list
    ret = {};
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
    extend: require('./extender')(require('./extend2')(typecheckers, false)),
    extendWithConcat: require('./extender')(require('./extend2')(typecheckers, true)),
    extendShallow: require('./extendshallow')(typecheckers)
  };
}

module.exports = createObjectManipulators;
