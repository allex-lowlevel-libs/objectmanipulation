var expect = require('chai').expect,
  lib = require('../')(require('allex_checkslowlevellib'));

describe ('Test picking', function () {
  it ('simple pick', function () {
    var ret = lib.pick ({a:1, b:2, c:3}, ['a','b']);
    expect (ret.c).not.to.exist;
    expect (ret.a).to.be.equal(1);
    expect (ret.b).to.be.equal(2);
  });
});

describe ('Test pickExcept', function () {
  it ('simple pickExcept', function () {
    var ret = lib.pickExcept ({a:1, b:2, c:3}, ['b','c']);
    expect (ret.a).to.be.equal(1);
    expect (ret.b).not.to.exist;
    expect (ret.c).not.to.exist;
  });
});
