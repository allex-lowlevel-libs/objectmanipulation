var expect = require('chai').expect,
  lib = require('../')(require('allex_checkslowlevellib'));

describe('Testing extend', function () {
  it('two plain objects', function (done) {
    var e = lib.extend({a:5}, {b:8});
    expect(e).to.have.deep.property('a', 5);
    expect(e).to.have.deep.property('b', 8);
    done();
  });
  it('two deep objects', function (done) {
    var e = lib.extend({a:5, aa: {a: 1}}, {b:8, bb: {a: 2}});
    expect(e).to.have.deep.property('a', 5);
    expect(e).to.have.deep.property('b', 8);
    expect(e).to.have.deep.property('aa.a', 1);
    expect(e).to.have.deep.property('bb.a', 2);
    done();
  });
  it('two deep objects with same property (overriding)', function (done) {
    var e = lib.extend({a:5, aa: {a: 1}}, {b:8, aa : {a: 2}});
    expect(e).to.have.deep.property('a', 5);
    expect(e).to.have.deep.property('b', 8);
    expect(e).to.have.deep.property('aa.a', 2);
    done();
  });
  it('three deep objects (arrays)', function (done) {
    var e = lib.extendShallow({a:5, aa: {a: 1}, bb: [4,5,6,7]}, {b:8, bb: {a: 2}}, {a: 8, bb: [1, 2, 3], aa: 'yes'});
    expect(e).to.have.deep.property('a', 8);
    expect(e).to.have.deep.property('b', 8);
    expect(e).to.have.deep.property('aa', 'yes');
    expect(e).to.have.deep.property('bb[2]', 3);
    expect(e).not.to.have.deep.property('bb[3]');
    done();
  });
});
