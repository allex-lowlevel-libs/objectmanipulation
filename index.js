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

  return {
    traverse:traverse,
    traverseConditionally:traverseConditionally,
    traverseShallow:traverseShallow,
    traverseShallowConditionally:traverseShallowConditionally,
    extend: require('./extend')(typecheckers),
    extendShallow: require('./extendshallow')(typecheckers)
  };
}

module.exports = createObjectManipulators;
