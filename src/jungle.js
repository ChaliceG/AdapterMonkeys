var Monkey = require('./monkey');

var Jungle = function () {
  this.monkeys = [
    new Monkey(),
    new Monkey(),
    new Monkey()
  ];
};

Jungle.prototype.save = function () {
  return Monkey.Save(this.monkeys);
};

Jungle.prototype.load = function () {
  return Monkey.Load()
    .then(monkeys => {
      this.monkeys = monkeys;
      return Promise.resolve();
    });
};

Jungle.prototype.action = function () {
  this.monkeys.forEach(monkey => {
    var newMonkeys = monkey.monkeyAround();
    if (newMonkeys && newMonkeys.length !== undefined) {
      newMonkeys.forEach(monkey => {
        this.monkeys.push(monkey);
      });
    }
  });
};

module.exports = Jungle;