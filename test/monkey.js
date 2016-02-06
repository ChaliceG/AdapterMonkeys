var Monkey;
var chai = require('chai');
var expect = require('chai').expect;
var db = require('../src/adapters/database');

describe('Monkey', function() {
  beforeEach(function () {
    Monkey = require('../src/monkey');
  });
  describe('#Load', function () {
    it('should return an array of monkeys from the db', function () {

      db.loadMonkeys = () => Promise.resolve([
        {
          name: 'jefferson',
          hunger: 0
        },
        {
          name: 'geofferson',
          hunger: 1
        }
      ]);

      return Monkey.Load()
        .then(monkeys => {
          monkeys.forEach(monkey => {
            expect(monkey.dead).equal(false);
          });
          return Promise.resolve(monkeys);
        })
        .should.eventually.have.property('length').equal(2);
    });
  });
  describe('#Save', function () {
    it('should take an array of monkeys and save them to the db', function () {
      var monkeys = [
        new Monkey(),
        new Monkey()
      ];

      var invoked = false;

      db.saveMonkeys = () => {
        invoked = true;
        return Promise.resolve();
      };

      return Monkey.Save(monkeys)
        .then(() => {
          expect(invoked).equal(true);
        }).should.eventually.be.resolved;
    });
    it('should not save dead monkeys', function () {
      var johnson = new Monkey();
      var invoked = false;

      johnson.dead = true;

      db.saveMonkeys = monkeys => {
        monkeys.length.should.equal(0);
        invoked = true;
        return Promise.resolve();
      };

      return Monkey.Save([johnson])
        .then(() => {
          expect(invoked).equal(true);
        }).should.eventually.be.resolved;
    });
  });
  describe('#constructor', function () {
    it('should set the dead flag to false', function () {
      var mankey = new Monkey();

      expect(mankey.dead).equal(false);
    });
    it('should take a name and hunger', function () {
      var mankey = new Monkey('jefferson', 1);

      mankey.should.have.property('name').equal('jefferson');
      mankey.should.have.property('hunger').equal(1);
    });
    it('should set hunger to 0 if no hunger is supplied', function () {
      var mankey = new Monkey('jefferson');

      mankey.should.have.property('name').equal('jefferson');
      mankey.should.have.property('hunger').equal(0);
    });
    it('should pick a random name if no name is supplied', function () {
      var mankey = new Monkey();

      mankey.name.should.have.property('length');
      (typeof mankey.name).should.equal('string');
    });
  });
  describe('#changeHunger', function () {
    it('should take an int and add it to hunger', function () {
      var mankey = new Monkey('jefferson', 1);

      mankey.changeHunger(-2);

      mankey.hunger.should.equal(-1);
    });
    it('should kill the monkey if hunger >= 2', function () {
      var mankey = new Monkey('jefferson', 1);

      expect(mankey.dead).equal(false);

      mankey.changeHunger(1);

      expect(mankey.dead).equal(true);
    });
  });
  describe('#eatBanana', function () {
    it('should decrease hunger by 2', function () {
      var mankey = new Monkey('jefferson', -1);

      mankey.eatBanana();

      expect(mankey.hunger).equal(-3);
    });
  });
  describe('#climbTree', function () {
    it('should increase hunger by 1', function () {
      var mankey = new Monkey('jefferson', -1);

      mankey.climbTree();

      expect(mankey.hunger).equal(0);
    });
  });
  describe('#monkeyBusiness', function () {
    it('should increase hunger by 1', function () {
      var mankey = new Monkey('jefferson', -1);

      mankey.monkeyBusiness();

      expect(mankey.hunger).equal(0);
    });
    it('should create and return an array of new monkeys', function () {
      var mankey = new Monkey('jefferson');

      var newMonkeys = mankey.monkeyBusiness();

      newMonkeys.should.have.property('length');

      expect(newMonkeys.length > 0).equal(true);
      expect(newMonkeys.length < 5).equal(true);

      newMonkeys.forEach(monkey => {
        (typeof monkey.name).should.equal('string');
        expect(monkey.hunger).equal(0);
      });
    });
  });
  describe('#monkeyAround', function () {
    it('should call a monkey action', function () {
      var mankey = new Monkey('jefferson', 0);

      mankey.monkeyAround();

      expect(mankey.hunger).not.equal(0);
    });
  });
});
