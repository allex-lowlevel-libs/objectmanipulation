var expect = require('chai').expect,
  lib = require('../')(require('allex_checkslowlevellib'));

describe('Testing extendShallow', function () {
  it('two plain objects', function (done) {
    var e = lib.extendShallow({a:5}, {b:8});
    expect(e).to.have.deep.property('a', 5);
    expect(e).to.have.deep.property('b', 8);
    done();
  });
  it('two deep objects', function (done) {
    var e = lib.extendShallow({a:5, aa: {a: 1}}, {b:8, bb: {a: 2}});
    expect(e).to.have.deep.property('a', 5);
    expect(e).to.have.deep.property('b', 8);
    expect(e).to.have.deep.property('aa.a', 1);
    expect(e).to.have.deep.property('bb.a', 2);
    done();
  });
  it('three deep objects', function (done) {
    var e = lib.extendShallow({a:5, aa: {a: 1}}, {b:8, bb: {a: 2}}, {a: 8, bb: [1, 2, 3], aa: 'yes'});
    expect(e).to.have.deep.property('a', 8);
    expect(e).to.have.deep.property('b', 8);
    expect(e).to.have.deep.property('aa', 'yes');
    expect(e).to.have.deep.property('bb[2]', 3);
    done();
  });
});
