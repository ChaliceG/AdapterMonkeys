var Jungle = require('../src/jungle');

describe('jungle', function () {
  describe('#constructor', function () {
    it('should create 3 monkeys', function () {
      var jangle = new Jungle();

      jangle.monkeys.length.should.equal(3);
    });
  });
  describe('#action', function () {
    it('should load all monkeys from the database');
    it('should have each monkey preform an action');
    it('should save all monkeys after');
  });
});